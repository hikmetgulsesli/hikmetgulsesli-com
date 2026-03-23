"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Github, Linkedin, Twitter, Network } from "lucide-react";

const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, "Minimum 2 karakter gerekli")
    .max(50)
    .regex(/^[a-zA-ZÇçĞğİıÖöŞşÜü\s]+$/, "Sadece harf kullanılabilir"),
  lastName: z
    .string()
    .min(2, "Minimum 2 karakter gerekli")
    .max(50)
    .regex(/^[a-zA-ZÇçĞğİıÖöŞşÜü\s]+$/, "Sadece harf kullanılabilir"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  subject: z.string().min(5, "Minimum 5 karakter gerekli").max(200),
  message: z.string().min(20, "Minimum 20 karakter gerekli").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setIsError(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In production, this would be a real API call
      console.log("Form submitted:", data);
      
      setIsSuccess(true);
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-16"
      >
        <div className="font-label text-primary text-xs mb-2 opacity-80 uppercase tracking-widest">
          [SYSTEM://ACCESS_GRANTED] / ROOT / CONTACT
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
          ESTABLISH<br />
          <span className="text-primary drop-shadow-[0_0_15px_rgba(78,222,163,0.3)]">
            CONNECTION
          </span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 bg-surface-container-low p-1 rounded-xl shadow-2xl relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          <div className="relative bg-surface p-8 md:p-10 rounded-lg">
            {/* Form Header */}
            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant/20 pb-4">
              <span className="font-label text-primary text-sm tracking-tighter">
                SEND_MESSAGE_PROTOCOL
              </span>
              <div className="h-px flex-1 bg-outline-variant/10" />
              <Network className="text-outline-variant text-sm" size={16} />
            </div>

            {/* Success Message */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg"
              >
                <p className="font-label text-primary text-sm">
                  Mesajınız başarıyla gönderildi
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {isError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg"
              >
                <p className="font-label text-error text-sm">
                  Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className="font-label text-xs text-on-surface-variant uppercase tracking-widest block"
                    htmlFor="first_name"
                  >
                    &gt;_FIRST_NAME
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    placeholder="NULL"
                    disabled={isSubmitting}
                    className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-primary text-on-surface font-label p-4 transition-all duration-300 placeholder:opacity-20 disabled:opacity-50"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-error text-xs font-label mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    className="font-label text-xs text-on-surface-variant uppercase tracking-widest block"
                    htmlFor="last_name"
                  >
                    &gt;_LAST_NAME
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    placeholder="NULL"
                    disabled={isSubmitting}
                    className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-primary text-on-surface font-label p-4 transition-all duration-300 placeholder:opacity-20 disabled:opacity-50"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-error text-xs font-label mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  className="font-label text-xs text-on-surface-variant uppercase tracking-widest block"
                  htmlFor="email"
                >
                  &gt;_EMAIL_ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="USER@DOMAIN.COM"
                  disabled={isSubmitting}
                  className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-primary text-on-surface font-label p-4 transition-all duration-300 placeholder:opacity-20 disabled:opacity-50"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-error text-xs font-label mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label
                  className="font-label text-xs text-on-surface-variant uppercase tracking-widest block"
                  htmlFor="subject"
                >
                  &gt;_SUBJECT_HEADER
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="PROJECT_ENQUIRY"
                  disabled={isSubmitting}
                  className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-primary text-on-surface font-label p-4 transition-all duration-300 placeholder:opacity-20 disabled:opacity-50"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-error text-xs font-label mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label
                  className="font-label text-xs text-on-surface-variant uppercase tracking-widest block"
                  htmlFor="message"
                >
                  &gt;_TRANSMISSION_BODY
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="ENTER_DATA..."
                  disabled={isSubmitting}
                  className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-primary text-on-surface font-label p-4 transition-all duration-300 placeholder:opacity-20 resize-none disabled:opacity-50"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-error text-xs font-label mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-primary text-on-primary font-headline font-black py-5 tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all hover:bg-primary-fixed-dim shadow-[0_0_30px_rgba(78,222,163,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>GÖNDERİLİYOR...</span>
                  </span>
                ) : (
                  <>
                    <span>TRANSMIT_MESSAGE</span>
                    <span className="group-hover:translate-x-2 transition-transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 2L11 13" />
                        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right Column: Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 space-y-8"
        >
          {/* Status Card */}
          <div className="bg-surface-container p-6 rounded-xl border-l-4 border-primary">
            <div className="flex items-center gap-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </div>
              <span className="font-label text-sm tracking-tighter font-bold text-primary">
                SYSTEM_READY // AVAILABLE_FOR_NEW_PROJECTS
              </span>
            </div>
          </div>

          {/* Contact Grid */}
          <div className="space-y-6">
            <h3 className="font-label text-xs text-outline-variant uppercase tracking-[0.3em] font-bold">
              CONTACT_METADATA
            </h3>

            {/* Email */}
            <a
              className="block group bg-surface-container-low hover:bg-surface-container transition-all p-6 rounded-lg"
              href="mailto:hikmet@hgconsole.dev"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-outline-variant font-label uppercase">
                      Email
                    </div>
                    <div className="font-label text-on-surface group-hover:text-primary transition-colors">
                      hikmet@hgconsole.dev
                    </div>
                  </div>
                </div>
                <svg
                  className="text-outline-variant group-hover:text-primary transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </a>

            {/* Location */}
            <div className="block group bg-surface-container-low p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center text-secondary">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-outline-variant font-label uppercase">
                    Location
                  </div>
                  <div className="font-label text-on-surface">
                    Türkiye (Europe/Istanbul)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6 pt-4">
            <h3 className="font-label text-xs text-outline-variant uppercase tracking-[0.3em] font-bold">
              EXTERNAL_NODES
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {/* GitHub */}
              <a
                className="bg-surface-container-low hover:bg-primary/20 aspect-square flex items-center justify-center rounded-lg transition-all group"
                href="https://github.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github
                  size={24}
                  className="opacity-50 group-hover:opacity-100 transition-opacity"
                />
              </a>

              {/* LinkedIn */}
              <a
                className="bg-surface-container-low hover:bg-primary/20 aspect-square flex items-center justify-center rounded-lg transition-all group"
                href="https://linkedin.com/in/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin
                  size={24}
                  className="opacity-50 group-hover:opacity-100 transition-opacity"
                />
              </a>

              {/* X/Twitter */}
              <a
                className="bg-surface-container-low hover:bg-primary/20 aspect-square flex items-center justify-center rounded-lg transition-all group"
                href="https://x.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter
                  size={24}
                  className="opacity-50 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Decorative Terminal Card */}
          <div className="bg-surface-container-lowest p-6 rounded-lg font-label text-[10px] border border-outline-variant/5">
            <div className="flex gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-error/40" />
              <div className="w-2 h-2 rounded-full bg-tertiary/40" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
            </div>
            <div className="space-y-1 text-on-surface-variant">
              <div className="flex gap-2">
                <span className="text-primary">&gt;</span>
                <span>npm install passion@latest</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">&gt;</span>
                <span>checking connectivity...</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">&gt;</span>
                <span>signal strength: 100%</span>
              </div>
              <div className="flex gap-2 text-primary/80">
                <span className="text-primary">&gt;</span>
                <span>ready for communication</span>
                <span className="cursor-blink" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
