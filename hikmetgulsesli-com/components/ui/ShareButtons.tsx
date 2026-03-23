"use client";

import { useToast } from "@/components/ui/Toast";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const { success, error } = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      success("Bağlantı kopyalandı!", url);
    } catch {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (!copied) {
          error("Bağlantı kopyalanamadı", "Tarayıcınız panoya kopyalamayı desteklemiyor.");
          return;
        }
        success("Bağlantı kopyalandı!", url);
      } catch {
        error("Bağlantı kopyalanamadı", "Bağlantı panoya kopyalanırken bir sorun oluştu.");
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-surface-container-high text-sm font-label hover:bg-primary/10 hover:text-primary border border-outline-variant/20 rounded-lg transition-colors flex items-center gap-2"
        aria-label="Twitter'da paylaş"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X'te Paylaş
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-surface-container-high text-sm font-label hover:bg-primary/10 hover:text-primary border border-outline-variant/20 rounded-lg transition-colors flex items-center gap-2"
        aria-label="LinkedIn'de paylaş"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn'de Paylaş
      </a>
      <button
        onClick={handleCopyLink}
        className="px-4 py-2 bg-surface-container-high text-sm font-label hover:bg-primary/10 hover:text-primary border border-outline-variant/20 rounded-lg transition-colors flex items-center gap-2"
        aria-label="Bağlantıyı kopyala"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Bağlantıyı Kopyala
      </button>
    </div>
  );
}
