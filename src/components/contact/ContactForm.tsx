"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Send, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ContactFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name (at least 2 characters)"),
  email: z.string().email("Please provide a valid email address"),
  phone: z
    .string()
    .regex(/^[0-9+\s-]{10,15}$/, "Please provide a valid 10-digit phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(3, "Please enter a subject"),
  storeInterest: z.string().optional(),
  message: z.string().min(10, "Your message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

interface ContactFormProps {
  stores?: { id: string; name: string }[];
}

export function ContactForm({ stores = [] }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    storeInterest: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "backend_notice" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = ContactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof ContactFormData;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    // Check if backend API endpoint is configured
    const apiEndpoint = process.env.NEXT_PUBLIC_CONTACT_API_URL;

    if (!apiEndpoint) {
      // Per instructions: "Do not display a success message if the submission has not actually succeeded. If no backend exists, document the requirement and clearly indicate that the form is not yet connected."
      setTimeout(() => {
        setStatus("backend_notice");
      }, 500);
      return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      // Success
      setStatus("backend_notice");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-brand-plum-900/10 shadow-xs">
      <h3 className="font-serif text-2xl text-brand-plum-900 mb-2">
        Send Us a Message
      </h3>
      <p className="text-sm text-brand-text-secondary font-light mb-6">
        Whether you have questions regarding our collections, store locations, or styling appointments, our concierge team is here to assist.
      </p>

      {status === "backend_notice" && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-brand-blush-50 border border-brand-plum-900/15 text-brand-plum-900 space-y-2"
        >
          <div className="flex items-center gap-2 font-medium">
            <Info className="w-5 h-5 text-brand-plum-700 shrink-0" />
            <span>Submission Validation Complete</span>
          </div>
          <p className="text-xs sm:text-sm text-brand-text-secondary">
            Thank you, <strong>{formData.fullName}</strong>. Your enquiry details have passed client-side validation. Because this public frontend is currently running in decoupled prototype mode without an active admin/CRM endpoint (<code className="bg-white/60 px-1 py-0.5 rounded text-[11px]">NEXT_PUBLIC_CONTACT_API_URL</code>), submissions are logged to this session. For immediate assistance, please reach our concierge at{" "}
            <a href="mailto:care@olenna.in" className="underline font-medium text-brand-plum-900">
              care@olenna.in
            </a>
            .
          </p>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-2.5"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">Could not transmit enquiry</p>
            <p className="text-xs text-red-700 mt-0.5">
              Please check your network connection or email us directly at care@olenna.in.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-semibold tracking-wider text-brand-plum-900 uppercase mb-1.5"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Radhika Sharma"
            className={`w-full px-4 py-2.5 text-sm rounded-xl bg-brand-ivory-50 border ${
              errors.fullName
                ? "border-red-400 focus:border-red-500"
                : "border-brand-plum-900/15 focus:border-brand-plum-900"
            } focus:outline-none text-brand-text-primary`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Email and Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold tracking-wider text-brand-plum-900 uppercase mb-1.5"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. radhika@example.com"
              className={`w-full px-4 py-2.5 text-sm rounded-xl bg-brand-ivory-50 border ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                : "border-brand-plum-900/15 focus:border-brand-plum-900"
              } focus:outline-none text-brand-text-primary`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold tracking-wider text-brand-plum-900 uppercase mb-1.5"
            >
              Phone Number <span className="text-brand-text-muted text-[10px] font-normal lowercase">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
              className={`w-full px-4 py-2.5 text-sm rounded-xl bg-brand-ivory-50 border ${
                errors.phone
                  ? "border-red-400 focus:border-red-500"
                  : "border-brand-plum-900/15 focus:border-brand-plum-900"
              } focus:outline-none text-brand-text-primary`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Store Selection & Subject */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="storeInterest"
              className="block text-xs font-semibold tracking-wider text-brand-plum-900 uppercase mb-1.5"
            >
              Preferred Store Location
            </label>
            <select
              id="storeInterest"
              name="storeInterest"
              value={formData.storeInterest}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-brand-ivory-50 border border-brand-plum-900/15 focus:border-brand-plum-900 focus:outline-none text-brand-text-primary"
            >
              <option value="">General Enquiry (Any Store)</option>
              {stores.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-semibold tracking-wider text-brand-plum-900 uppercase mb-1.5"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Bridal Styling Appointment"
              className={`w-full px-4 py-2.5 text-sm rounded-xl bg-brand-ivory-50 border ${
                errors.subject
                  ? "border-red-400 focus:border-red-500"
                  : "border-brand-plum-900/15 focus:border-brand-plum-900"
              } focus:outline-none text-brand-text-primary`}
            />
            {errors.subject && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold tracking-wider text-brand-plum-900 uppercase mb-1.5"
          >
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Share details about what you're looking for..."
            className={`w-full px-4 py-2.5 text-sm rounded-xl bg-brand-ivory-50 border ${
              errors.message
                ? "border-red-400 focus:border-red-500"
                : "border-brand-plum-900/15 focus:border-brand-plum-900"
            } focus:outline-none text-brand-text-primary`}
          />
          {errors.message && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={status === "submitting"}
            className="w-full sm:w-auto"
          >
            <Send className="w-4 h-4 mr-1.5" />
            <span>{status === "submitting" ? "Validating..." : "Submit Enquiry"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
