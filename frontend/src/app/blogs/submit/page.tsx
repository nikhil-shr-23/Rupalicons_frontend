"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SubmitBlogPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="pt-40 pb-20 px-6 max-w-3xl mx-auto w-full grow">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-accent-dark mb-10 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Journal
        </Link>

        <div>
          <h1 className="text-4xl font-bold font-syne text-accent-dark mb-4">
            Submit an Article
          </h1>
          <p className="text-gray-500 mb-10">
            Have a story, insight, or trend to share? Submit your article to be featured in our journal.
          </p>

          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-xl text-center">
            <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              ✉️
            </div>
            <h3 className="text-3xl font-bold font-syne text-accent-dark mb-4">
              Write for Rupali Homes
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-lg mx-auto">
              To make your blog feature in Rupali Homes, please mail your blog details, content, and author information to our editorial team.
            </p>
            <a 
              href="mailto:blog@rupalihomes.com" 
              className="inline-flex bg-accent-dark hover:bg-gold text-white font-bold py-4 px-8 rounded-full shadow-lg hover:-translate-y-1 transition-all text-xl"
            >
              blog@rupalihomes.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
