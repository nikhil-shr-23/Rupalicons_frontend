"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBlog } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SubmitBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append(
        "blog",
        new Blob([JSON.stringify(formData)], { type: "application/json" }),
      );
      if (imageFile) {
        data.append("image", imageFile);
      }

      const newBlog = await createBlog(data);
      if (newBlog) {
        setSubmitted(true);
      } else {
        alert("Failed to submit article. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

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

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <span className="text-5xl mb-4 block">🎉</span>
              <h3 className="text-2xl font-bold font-syne text-green-800 mb-2">
                Article Submitted!
              </h3>
              <p className="text-green-700 mb-6">
                Thank you for your submission. Our editorial team will review it shortly.
              </p>
              <Link href="/blogs">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Return to Journal
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Article Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., The Future of Luxury Living"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g., Interior Design"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Your Name</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g., Jane Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Cover Image (Optional)</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer file:cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Write your article content here..."
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-yellow-600 text-white py-6 text-lg font-bold shadow-lg hover:-translate-y-1 transition-all"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Article"}
                  </Button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By submitting, you agree to our editorial guidelines.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
