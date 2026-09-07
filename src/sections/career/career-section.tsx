"use client";

import React, { useState } from "react";
import { GrpJobPosition } from "@/db/schema";
import { Reveal } from "@/components/ui/reveal";
import { ApplicationForm } from "@/components/career/application-form";
import { JobModal } from "@/components/career/job-modal";
import {
  ChevronRight,
  Inbox,
  ArrowRight,
} from "lucide-react";

interface CareerSectionProps {
  initialPositions?: GrpJobPosition[];
}

export function CareerSection({ initialPositions = [] }: CareerSectionProps) {
  const [selectedJob, setSelectedJob] = useState<GrpJobPosition | null>(null);
  const [selectedJobTitleForForm, setSelectedJobTitleForForm] = useState<string>("");

  const handleOpenDetail = (pos: GrpJobPosition) => {
    setSelectedJob(pos);
  };

  const handleApplyFromModal = (pos: GrpJobPosition) => {
    setSelectedJobTitleForForm(pos.title);
    setSelectedJob(null);
    const formElement = document.getElementById("career-application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[340px] md:h-[430px] flex items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-brand-navy/60 to-brand-navy" />
          <div className="absolute inset-0 bg-brand-navy/85 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Reveal animation="fade-up" durationMs={600}>
            <h1 className="font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl">
              Build Your Future and <br className="hidden sm:block" />
              Grow With <span className="text-brand-gold">Best Deals</span> Asia Group
            </h1>
            <div className="w-20 h-1 bg-brand-gold mt-4" />
          </Reveal>
        </div>
      </section>

      {/* Main Content: Form + Positions Sidebar */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form Lamaran Kerja */}
          <div id="career-application-form" className="lg:col-span-7 scroll-mt-24">
            <ApplicationForm
              positions={initialPositions}
              selectedJobTitle={selectedJobTitleForForm}
              onJobSelect={(title) => setSelectedJobTitleForForm(title)}
            />
          </div>

          {/* Right Column: Open Vacancies (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 w-full">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                    Hiring Now
                  </span>
                  <h3 className="font-bold text-xl text-brand-navy tracking-tight">
                    Open Positions
                  </h3>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-brand-navy text-xs font-bold rounded-full border border-amber-200/50">
                  {initialPositions.length} Roles
                </span>
              </div>

              <div className="space-y-3.5 max-h-[560px] overflow-y-auto pr-1">
                {initialPositions.length > 0 ? (
                  initialPositions.map((job) => (
                    <div
                      key={job.id}
                      className="group p-4 sm:p-5 rounded-2xl border border-slate-100 hover:border-brand-navy/30 hover:bg-slate-50/70 transition-all shadow-sm hover:shadow relative cursor-pointer"
                      onClick={() => handleOpenDetail(job)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-sm sm:text-base text-slate-800 group-hover:text-brand-navy transition-colors">
                            {job.title}
                          </h4>
                          <div
                            className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: job.description.replace(/<[^>]+>/g, " ").slice(0, 150),
                            }}
                          />
                        </div>
                        <span className="p-2 rounded-xl bg-slate-100 group-hover:bg-brand-sand text-slate-400 group-hover:text-brand-navy transition-colors shrink-0">
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-brand-navy inline-flex items-center gap-1 group-hover:text-amber-600 transition-colors">
                          View Details & Apply
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400 space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <Inbox className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-sm text-slate-600">No Open Positions</p>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      There are currently no active vacancies open. Check back soon for new opportunities.
                    </p>
                  </div>
                )}
              </div>

              {initialPositions.length > 0 && (
                <p className="text-xs text-slate-400 text-center pt-2">
                  Click any vacancy to read responsibilities and qualifications.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Detail */}
      <JobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={handleApplyFromModal}
      />
    </div>
  );
}

export default CareerSection;
