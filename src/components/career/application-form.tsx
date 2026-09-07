"use client";

import React, { useState, useRef } from "react";
import { GrpJobPosition } from "@/db/schema";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  Loader2,
} from "lucide-react";

interface ApplicationFormProps {
  positions: GrpJobPosition[];
  selectedJobTitle?: string;
  onJobSelect?: (title: string) => void;
}

export function ApplicationForm({
  positions,
  selectedJobTitle = "",
  onJobSelect,
}: ApplicationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState(selectedJobTitle);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [prevSelectedTitle, setPrevSelectedTitle] = useState(selectedJobTitle);
  if (selectedJobTitle !== prevSelectedTitle) {
    setPrevSelectedTitle(selectedJobTitle);
    setJobTitle(selectedJobTitle);
  }

  const handlePositionChange = (val: string) => {
    setJobTitle(val);
    if (onJobSelect) onJobSelect(val);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      setErrorMessage("The CV must be a file of type: PDF only.");
      setCvFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("The CV file size must not exceed 10MB.");
      setCvFile(null);
      return;
    }

    setErrorMessage("");
    setCvFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      setErrorMessage("The CV must be a file of type: PDF only.");
      setCvFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("The CV file size must not exceed 10MB.");
      setCvFile(null);
      return;
    }

    setErrorMessage("");
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!cvFile) {
      setErrorMessage("Please upload your CV in PDF format (Max 10MB).");
      return;
    }

    if (!jobTitle) {
      setErrorMessage("Please select the position you are applying for.");
      return;
    }

    const matched = positions.find((p) => p.title === jobTitle);

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("jobTitle", jobTitle);
      if (matched?.id) {
        formData.append("jobPositionId", matched.id.toString());
      }
      formData.append("cv", cvFile);

      const res = await fetch("/api/career/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit job application.");
      }

      setSuccessMessage(
        `Thank you, ${name}! Your application for "${jobTitle}" has been received. Our HR recruitment team will review your profile.`
      );

      // Reset Form
      setName("");
      setEmail("");
      setPhone("");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMessage(error.message || "An unexpected error occurred while submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 lg:p-12 shadow-sm shadow-slate-200/50 border border-slate-200/70 rounded-3xl">
      <div className="border-b border-slate-100 pb-6 mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy uppercase tracking-wider bg-brand-sand px-3 py-1 rounded-md mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-navy animate-pulse" />
          Job Application Form
        </div>
        <h2 className="font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight">
          Apply for an Open Role
        </h2>
        <p className="font-normal text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
          Fill out the application below and upload your resume/CV. Our recruitment team will review your qualifications and reach out to selected applicants.
        </p>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl font-medium text-sm flex items-start justify-between gap-3 shadow-inner">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-800 text-base">Application Received</p>
              <p className="text-emerald-700 text-xs sm:text-sm mt-1 leading-relaxed">
                {successMessage}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            className="text-emerald-600 hover:text-emerald-800 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-8 p-5 bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl font-medium text-sm flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-800 text-base">Submission Error</p>
              <p className="text-rose-700 text-xs sm:text-sm mt-1 leading-relaxed">
                {errorMessage}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            className="text-rose-600 hover:text-rose-800 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="sm:col-span-2 space-y-2">
            <label
              htmlFor="name"
              className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center justify-between"
            >
              <span>
                Full Name <span className="text-rose-500">*</span>
              </span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Putra"
              required
              className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 focus:border-brand-navy focus:bg-white focus:ring-4 focus:ring-brand-navy/5 rounded-xl transition-all outline-none font-normal text-base text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2 sm:col-span-2 md:col-span-1">
            <label
              htmlFor="email"
              className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center justify-between"
            >
              <span>
                Email Address <span className="text-rose-500">*</span>
              </span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@email.com"
              required
              className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 focus:border-brand-navy focus:bg-white focus:ring-4 focus:ring-brand-navy/5 rounded-xl transition-all outline-none font-normal text-base text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Phone / WhatsApp */}
          <div className="space-y-2 sm:col-span-2 md:col-span-1">
            <label
              htmlFor="phone"
              className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center justify-between"
            >
              <span>
                Phone / WhatsApp <span className="text-rose-500">*</span>
              </span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="081234567890"
              required
              className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 focus:border-brand-navy focus:bg-white focus:ring-4 focus:ring-brand-navy/5 rounded-xl transition-all outline-none font-normal text-base text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Position Dropdown */}
          <div className="sm:col-span-2 space-y-2">
            <label
              htmlFor="jobPosition"
              className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center justify-between"
            >
              <span>
                Position Applied For <span className="text-rose-500">*</span>
              </span>
            </label>
            <div className="relative">
              <select
                id="jobPosition"
                value={jobTitle}
                onChange={(e) => handlePositionChange(e.target.value)}
                required
                disabled={positions.length === 0}
                className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 focus:border-brand-navy focus:bg-white focus:ring-4 focus:ring-brand-navy/5 rounded-xl transition-all outline-none font-normal text-base text-slate-800 appearance-none cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {positions.length > 0
                    ? "-- Select an Open Position --"
                    : "-- No Active Positions Available --"}
                </option>
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.title}>
                    {pos.title}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {positions.length === 0 && (
              <p className="text-xs text-amber-600 mt-1 font-medium">
                There are currently no active vacancies open for application.
              </p>
            )}
          </div>

          {/* CV / Resume Upload */}
          <div className="sm:col-span-2 space-y-2">
            <label
              htmlFor="cv"
              className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center justify-between"
            >
              <span>
                Upload CV / Resume <span className="text-rose-500">*</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal lowercase">
                PDF format only (Max 10MB)
              </span>
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer group ${
                isDragging
                  ? "border-brand-navy bg-blue-50/50"
                  : "border-slate-300 hover:border-brand-navy/60 bg-slate-50/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                id="cv"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                disabled={positions.length === 0}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 group-hover:bg-brand-navy flex items-center justify-center text-brand-gold group-hover:text-white transition-all duration-300 shadow-sm shadow-amber-500/10">
                  <UploadCloud className="w-7 h-7" />
                </div>

                <div>
                  <p className="font-bold text-sm text-brand-navy">
                    Click to browse or drag & drop your CV (PDF)
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supported format: PDF only (Max 10MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Selected File Preview */}
            {cvFile && (
              <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 truncate">
                  <FileText className="w-6 h-6 text-rose-500 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {cvFile.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {(cvFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCvFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || positions.length === 0}
            className="w-full bg-brand-gold hover:bg-amber-400 text-brand-navy px-8 py-4 font-bold uppercase tracking-widest text-sm rounded-xl transition-all shadow-md shadow-amber-400/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Application...</span>
              </>
            ) : (
              <>
                <span>{positions.length > 0 ? "Submit Application" : "No Openings Available"}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
