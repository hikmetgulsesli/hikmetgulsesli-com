import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// In-memory rate limiting: Map<ip, { count: number, resetTime: number }>
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // If no entry or entry has expired, create new entry
  if (!entry || now > entry.resetTime) {
    const resetTime = now + RATE_LIMIT_WINDOW;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetTime };
  }

  // If under limit, increment
  if (entry.count < RATE_LIMIT) {
    entry.count++;
    return { allowed: true, remaining: RATE_LIMIT - entry.count, resetTime: entry.resetTime };
  }

  // Rate limit exceeded
  return { allowed: false, remaining: 0, resetTime: entry.resetTime };
}

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

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Check rate limit
    const rateLimitInfo = getRateLimitInfo(ip);
    
    // Set rate limit headers
    const headers = {
      "X-RateLimit-Limit": RATE_LIMIT.toString(),
      "X-RateLimit-Remaining": rateLimitInfo.remaining.toString(),
      "X-RateLimit-Reset": Math.ceil(rateLimitInfo.resetTime / 1000).toString(),
    };

    if (!rateLimitInfo.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: "Çok fazla istek gönderdiniz. Lütfen 1 saat sonra tekrar deneyin.",
          },
        },
        { status: 429, headers }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        const field = err.path[0];
        if (field && typeof field === "string") {
          errors[field] = err.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Form verileri doğrulanamadı.",
            details: errors,
          },
        },
        { status: 400, headers }
      );
    }

    const { firstName, lastName, email, subject, message } = validationResult.data;

    // In a real application, you would:
    // 1. Send email via a service like SendGrid, Resend, or Nodemailer
    // 2. Store the submission in a database
    // 3. Send a notification to Slack/Discord webhook
    //
    // For now, we log the submission (simulating successful processing)
    console.log("Contact form submission:", {
      firstName,
      lastName,
      email,
      subject,
      message: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
      timestamp: new Date().toISOString(),
      ip,
    });

    // Simulate processing delay (would be actual email/DB operation in production)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          message: "Mesajınız başarıyla gönderildi!",
        },
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Bir hata oluştu, lütfen tekrar deneyin",
        },
      },
      { status: 500 }
    );
  }
}