"use client";

import { useState } from "react";
import { Upload, X, ShieldCheck } from "lucide-react";

export default function AddBrochure() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-navy-900 mb-8">
        Add New Project / Brochure
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-400 focus:border-gold-400"
                placeholder="e.g. The Golden Heights"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-400 focus:border-gold-400"
                placeholder="e.g. City Center"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-400 focus:border-gold-400"
              placeholder="Describe the project details..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Brochure/Image
            </label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${file ? "border-gold-400 bg-gold-50" : "border-gray-300 hover:border-gold-400"}`}
            >
              <div className="space-y-1 text-center">
                {file ? (
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="mx-auto h-12 w-12 text-green-500" />
                    <p className="text-sm text-navy-900 font-medium mt-2">
                      {file.name}
                    </p>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="mt-2 text-xs text-red-500 hover:text-red-700 flex items-center"
                    >
                      <X className="h-3 w-3 mr-1" /> Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-gold-600 hover:text-gold-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gold-400"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-900 hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
