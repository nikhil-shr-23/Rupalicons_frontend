"use client";

// ─────────────────────────────────────────────────────────────────────────
// Public-visitor ("normal user") account system.
//
// Backed by the Spring Boot backend (/normal-user/*). The account, its
// password, and profile now live in PostgreSQL; this context holds the issued
// JWT (localStorage) and the current profile. The interface is unchanged from
// the previous localStorage-only implementation, so the UI is untouched —
// signup/login/updateProfile are now async (they hit the network).
//
// Enquiry history remains client-side (localStorage) for now; there is no
// backend enquiry-per-user endpoint yet.
// ─────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  registerNormalUser,
  loginNormalUser,
  fetchNormalUserProfile,
  updateNormalUserProfile,
  type NormalUserAccount,
} from "@/lib/api";

export type Account = NormalUserAccount;

export interface EnquiryRecord {
  id: string;
  type: string; // CONTACT, PROPERTY, VALUATION, LOAN...
  subject: string;
  message?: string;
  createdAt: string;
}

interface AuthContextValue {
  user: Account | null;
  ready: boolean; // hydration complete
  signup: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    phoneVerified: boolean;
    firebaseUid: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (
    data: Partial<
      Pick<
        Account,
        "name" | "phone" | "phoneVerified" | "phoneVerifiedAt" | "firebaseUid"
      >
    >,
  ) => Promise<{ ok: boolean; error?: string }>;
  enquiries: EnquiryRecord[];
  recordEnquiry: (e: Omit<EnquiryRecord, "id" | "createdAt">) => void;
}

const TOKEN_KEY = "rupali_token";
const enquiriesKey = (userId: string) => `rupali_enquiries_${userId}`;

function makeId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [ready, setReady] = useState(false);

  const loadEnquiries = useCallback((userId: string) => {
    try {
      setEnquiries(
        JSON.parse(localStorage.getItem(enquiriesKey(userId)) || "[]"),
      );
    } catch {
      setEnquiries([]);
    }
  }, []);

  // Hydrate session from a stored token on mount.
  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      const token = getToken();
      if (token) {
        const profile = await fetchNormalUserProfile(token);
        if (!cancelled) {
          if (profile) {
            setUser(profile);
            loadEnquiries(profile.id);
          } else {
            // Token expired or invalid — drop it.
            localStorage.removeItem(TOKEN_KEY);
          }
        }
      }
      if (!cancelled) setReady(true);
    };

    hydrate();

    return () => {
      cancelled = true;
    };
  }, [loadEnquiries]);

  const signup = useCallback(
    async (data: {
      name: string;
      email: string;
      phone: string;
      password: string;
      phoneVerified: boolean;
      firebaseUid: string;
    }) => {
      const result = await registerNormalUser({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.replace(/\D/g, ""),
        password: data.password,
        phoneVerified: data.phoneVerified,
        firebaseUid: data.firebaseUid,
      });
      if (!result.ok || !result.token || !result.user) {
        return { ok: false, error: result.error };
      }
      localStorage.setItem(TOKEN_KEY, result.token);
      setUser(result.user);
      setEnquiries([]);
      return { ok: true };
    },
    [],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginNormalUser(
        email.trim().toLowerCase(),
        password,
      );
      if (!result.ok || !result.token || !result.user) {
        return { ok: false, error: result.error };
      }
      localStorage.setItem(TOKEN_KEY, result.token);
      setUser(result.user);
      loadEnquiries(result.user.id);
      return { ok: true };
    },
    [loadEnquiries],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setEnquiries([]);
  }, []);

  const updateProfile = useCallback(
    async (
      data: Partial<
        Pick<
          Account,
          "name" | "phone" | "phoneVerified" | "phoneVerifiedAt" | "firebaseUid"
        >
      >,
    ) => {
      const token = getToken();
      if (!token) return { ok: false, error: "You are not signed in." };

      const patch: {
        name?: string;
        phone?: string;
        phoneVerified?: boolean;
        firebaseUid?: string;
      } = {};
      if (data.name !== undefined) patch.name = data.name;
      if (data.phone !== undefined) patch.phone = data.phone.replace(/\D/g, "");
      if (data.phoneVerified !== undefined)
        patch.phoneVerified = data.phoneVerified;
      if (data.firebaseUid !== undefined) patch.firebaseUid = data.firebaseUid;

      const result = await updateNormalUserProfile(token, patch);
      if (!result.ok || !result.user) {
        return { ok: false, error: result.error };
      }
      setUser(result.user);
      return { ok: true };
    },
    [],
  );

  const recordEnquiry = useCallback(
    (e: Omit<EnquiryRecord, "id" | "createdAt">) => {
      if (!user) return;
      const record: EnquiryRecord = {
        ...e,
        id: makeId(),
        createdAt: new Date().toISOString(),
      };
      const next = [record, ...enquiries];
      setEnquiries(next);
      localStorage.setItem(enquiriesKey(user.id), JSON.stringify(next));
    },
    [user, enquiries],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        signup,
        login,
        logout,
        updateProfile,
        enquiries,
        recordEnquiry,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
