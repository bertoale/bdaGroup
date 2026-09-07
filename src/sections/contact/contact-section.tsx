"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { MapPin, Send, CheckCircle2, Building, Phone, Mail } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  YouTubeIcon,
  GoogleMapsIcon,
} from "@/components/ui/social-icons";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    businessInterest: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal animation="fade-up" durationMs={600}>
          <div className="mb-14 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight uppercase">
              Contact Us
            </h1>
            <div className="w-20 h-1 bg-brand-gold mt-4 mb-5" />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Connect directly with our headquarters in Legian, Bali. Whether you are seeking villa management, real estate advisory, vacation rentals, or group partnerships, our team is at your service.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Office Details & Map */}
          <Reveal animation="fade-right" durationMs={800} className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-navy tracking-tight">
                Our Office
              </h2>

              <div className="space-y-3.5 text-sm text-foreground/85">
                <div className="flex items-start gap-3.5">
                  <div className="size-9 rounded-xl bg-brand-sand flex items-center justify-center shrink-0 text-brand-navy mt-0.5">
                    <MapPin className="size-4.5" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy font-semibold mb-0.5">Head Office Address</strong>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Jl. Dewi Sri IV No.2D, Legian, Kec. Kuta, Kabupaten Badung, Bali 80361, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="size-9 rounded-xl bg-brand-sand flex items-center justify-center shrink-0 text-brand-navy">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy font-semibold text-xs mb-0.5">Phone Number</strong>
                    <a href="tel:+623619344211" className="text-xs text-muted-foreground hover:text-brand-navy font-medium transition-colors">
                      +62 361 9344211
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="size-9 rounded-xl bg-brand-sand flex items-center justify-center shrink-0 text-brand-navy">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy font-semibold text-xs mb-0.5">Email Address</strong>
                    <a href="mailto:info@bestdealsasiagroup.com" className="text-xs text-muted-foreground hover:text-brand-navy font-medium transition-colors">
                      info@bestdealsasiagroup.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-2 border-t border-border">
                <span className="text-xs font-semibold text-brand-navy block mb-3">
                  Follow & Connect With Us
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/bestdealsasiarentals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10 rounded-xl border border-border bg-slate-50/70 hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold/50 flex items-center justify-center text-brand-navy transition-all shadow-xs"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <InstagramIcon className="size-5 text-pink-600 hover:text-inherit transition-colors" />
                  </a>

                  <a
                    href="https://www.facebook.com/people/Best-Deals-Asia-Group/100086480796938/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10 rounded-xl border border-border bg-slate-50/70 hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold/50 flex items-center justify-center text-brand-navy transition-all shadow-xs"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <FacebookIcon className="size-5 text-blue-600 hover:text-inherit transition-colors" />
                  </a>

                  <a
                    href="https://www.tiktok.com/@bestdealsasiagroup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10 rounded-xl border border-border bg-slate-50/70 hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold/50 flex items-center justify-center text-brand-navy transition-all shadow-xs"
                    aria-label="TikTok"
                    title="TikTok"
                  >
                    <TikTokIcon className="size-5 text-slate-900 hover:text-inherit transition-colors" />
                  </a>

                  {/* 
                  <a
                    href="https://www.youtube.com/@bestdealsasiagroup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10 rounded-xl border border-border bg-slate-50/70 hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold/50 flex items-center justify-center text-brand-navy transition-all shadow-xs"
                    aria-label="YouTube"
                    title="YouTube"
                  >
                    <YouTubeIcon className="size-5 text-red-600 hover:text-inherit transition-colors" />
                  </a>
                  */}
                </div>
              </div>

              {/* Embedded Google Map inside the card */}
              <div className="w-full h-60 sm:h-64 rounded-2xl overflow-hidden border border-border shadow-inner">
                <iframe
                  title="Best Deals Asia Group Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.896467541364!2d115.17589170000001!3d-8.701381399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2474e38119565%3A0xc1b5232640cc3599!2sBest%20Deals%20Asia%20Group!5e0!3m2!1sen!2sid!4v1788745675095!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Action: Open in Google Maps */}
              <div className="pt-2 border-t border-border">
                <a
                  href="https://maps.google.com/?q=Best+Deals+Asia+Group+Legian+Bali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-sand hover:bg-brand-navy hover:text-white text-brand-navy font-bold text-xs py-3 rounded-xl transition-all"
                >
                  <GoogleMapsIcon className="size-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Inquiry Form */}
          <Reveal animation="fade-left" durationMs={800} delayMs={150} className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy">Message Received</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you for reaching out to Best Deals Asia Group. Our representative will review your message and reply promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center text-xs font-bold text-brand-navy bg-brand-sand px-5 py-2.5 rounded-xl hover:bg-brand-navy hover:text-white transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-navy tracking-tight">
                      Send an Inquiry
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Fill out the form below and our team will get in touch with you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-navy">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-navy">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-navy">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+62 812 3456 7890"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-navy">Business / Topic of Interest</label>
                      <select
                        value={formState.businessInterest}
                        onChange={(e) => setFormState({ ...formState, businessInterest: e.target.value })}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                      >
                        <option value="General Inquiry">General Group Inquiry</option>
                        <option value="Vacation Rentals">Vacation Rental Accommodation</option>
                        <option value="Property Management">Property Management & Hospitality</option>
                        <option value="Real Estate">Real Estate & Property Acquisition</option>
                        <option value="Project & Maintenance">Project, Maintenance & Renovation</option>
                        <option value="Function & Event">Function & Event Planning</option>
                        <option value="Digital Solutions">Digital Solutions & Creative</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-navy">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please tell us how we can assist you..."
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <span>Submit Message</span>
                    <Send className="size-4" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;
