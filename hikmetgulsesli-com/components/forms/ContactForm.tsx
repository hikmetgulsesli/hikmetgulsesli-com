"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/Toast";
import { Send, Loader2 } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(2, "Ad en az 2 karakter olmalı").max(50, "Ad en fazla 50 karakter olabilir"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalı").max(50, "Soyad en fazla 50 karakter olabilir"),
  email: z.string().min(5, "E-posta en az 5 karakter olmalı").email("Geçerli bir e-posta adresi girin"),
  subject: z.string().min(5, "Konu en az 5 karakter olmalı").max(200, "Konu en fazla 200 karakter olabilir"),
  message: z.string().min(20, "Mesaj en az 20 karakter olmalı").max(2000, "Mesaj en fazla 2000 karakter olabilir"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (process.env.NODE_ENV !== "production") {
        console.log("Form submitted:", data);
      }

      success("Mesajınız gönderildi!", "En kısa sürede size dönüş yapacağım.");
      reset();
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Form submission failed:", err);
      }
      error("Mesaj gönderilemedi", "Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-label uppercase tracking-wider text-on-surface-variant mb-2">Ad</label>
          <input id="firstName" type="text" autoComplete="given-name" className={`w-full px-4 py-3 bg-surface-container-high border rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${errors.firstName ? "border-red-400/50" : "border-outline-variant/30"}`} placeholder="Adınız" {...register("firstName")} />
          {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-label uppercase tracking-wider text-on-surface-variant mb-2">Soyad</label>
          <input id="lastName" type="text" autoComplete="family-name" className={`w-full px-4 py-3 bg-surface-container-high border rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${errors.lastName ? "border-red-400/50" : "border-outline-variant/30"}`} placeholder="Soyadınız" {...register("lastName")} />
          {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-label uppercase tracking-wider text-on-surface-variant mb-2">E-posta</label>
        <input id="email" type="email" autoComplete="email" className={`w-full px-4 py-3 bg-surface-container-high border rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${errors.email ? "border-red-400/50" : "border-outline-variant/30"}`} placeholder="ornek@email.com" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-label uppercase tracking-wider text-on-surface-variant mb-2">Konu</label>
        <input id="subject" type="text" className={`w-full px-4 py-3 bg-surface-container-high border rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${errors.subject ? "border-red-400/50" : "border-outline-variant/30"}`} placeholder="Mesajınızın konusu" {...register("subject")} />
        {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-label uppercase tracking-wider text-on-surface-variant mb-2">Mesaj</label>
        <textarea id="message" rows={6} className={`w-full px-4 py-3 bg-surface-container-high border rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-y ${errors.message ? "border-red-400/50" : "border-outline-variant/30"}`} placeholder="Mesajınızı buraya yazın..." {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-primary text-[var(--color-on-primary)] font-bold rounded-lg shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:shadow-[0_0_30px_rgba(78,222,163,0.4)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
        {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Gönderiliyor...</> : <><Send className="w-5 h-5" />Mesaj Gönder</>}
      </button>
    </form>
  );
}
