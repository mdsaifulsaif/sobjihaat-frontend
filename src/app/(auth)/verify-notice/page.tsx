// "use client";

// import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { useResendVerificationMutation } from "@/redux/api/authApi";
// import { FiMail, FiRefreshCw } from "react-icons/fi";
// import { toast } from "react-hot-toast";

// export default function VerifyNoticePage() {
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email") || "";

//   const [resendVerification, { isLoading }] = useResendVerificationMutation();
//   const [cooldown, setCooldown] = useState(0);

//   const handleResend = async () => {
//     if (!email || cooldown > 0) return;

//     try {
//       const data = await resendVerification(email).unwrap();
//       toast.success(data?.message || "Verification email sent again!");

//       // ৩০ সেকেন্ড cooldown - বারবার spam click ঠেকাতে
//       setCooldown(30);
//       const timer = setInterval(() => {
//         setCooldown((c) => {
//           if (c <= 1) {
//             clearInterval(timer);
//             return 0;
//           }
//           return c - 1;
//         });
//       }, 1000);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Could not resend email. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
//       <div className="w-full max-w-[440px] bg-white p-8 rounded-md shadow-2xl shadow-gray-200 border border-gray-100 text-center">
//         {/* Icon */}
//         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/10 mb-6">
//           <FiMail size={28} className="text-[var(--color-primary)]" />
//         </div>

//         <h1 className="text-2xl font-black text-gray-900 mb-3">
//           Check your email
//         </h1>

//         <p className="text-gray-500 font-medium mb-1">
//           We&apos;ve sent a verification link to
//         </p>
//         <p className="text-gray-900 font-bold mb-6 break-all">
//           {email || "your email address"}
//         </p>

//         <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed">
//           Click the link in the email to activate your account. Don&apos;t
//           forget to check your spam folder if you don&apos;t see it.
//         </p>

//         <button
//           onClick={handleResend}
//           disabled={isLoading || cooldown > 0}
//           className="w-full flex items-center justify-center gap-2 py-3.5 border border-gray-200 rounded-md font-bold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
//         >
//           <FiRefreshCw
//             size={16}
//             className={isLoading ? "animate-spin" : ""}
//           />
//           {cooldown > 0
//             ? `Resend available in ${cooldown}s`
//             : isLoading
//             ? "Sending..."
//             : "Resend verification email"}
//         </button>

//         <div className="pt-6 border-t border-gray-50">
//           <p className="text-sm text-gray-500 font-medium">
//             Wrong email?{" "}
//             <Link
//               href="/register"
//               className="text-[var(--color-primary)] font-bold hover:underline"
//             >
//               Register again
//             </Link>
//           </p>
//           <p className="text-sm text-gray-500 font-medium mt-2">
//             Already verified?{" "}
//             <Link
//               href="/login"
//               className="text-[var(--color-primary)] font-bold hover:underline"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useResendVerificationMutation } from "@/redux/api/authApi";
import { FiMail, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-hot-toast";

// ১. মূল লজিক এবং ইউআই কম্পোনেন্ট
function VerifyNoticeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resendVerification, { isLoading }] = useResendVerificationMutation();
  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    if (!email || cooldown > 0) return;

    try {
      const data = await resendVerification(email).unwrap();
      toast.success(data?.message || "Verification email sent again!");

      // ৩০ সেকেন্ড cooldown - বারবার spam click ঠেকাতে
      setCooldown(30);
      const timer = setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } catch (err: any) {
      toast.error(err?.data?.message || "Could not resend email. Try again.");
    }
  };

  return (
    <div className="w-full max-w-[440px] bg-white p-8 rounded-md shadow-2xl shadow-gray-200 border border-gray-100 text-center">
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/10 mb-6">
        <FiMail size={28} className="text-[var(--color-primary)]" />
      </div>

      <h1 className="text-2xl font-black text-gray-900 mb-3">
        Check your email
      </h1>

      <p className="text-gray-500 font-medium mb-1">
        We&apos;ve sent a verification link to
      </p>
      <p className="text-gray-900 font-bold mb-6 break-all">
        {email || "your email address"}
      </p>

      <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed">
        Click the link in the email to activate your account. Don&apos;t
        forget to check your spam folder if you don&apos;t see it.
      </p>

      <button
        onClick={handleResend}
        disabled={isLoading || cooldown > 0}
        className="w-full flex items-center justify-center gap-2 py-3.5 border border-gray-200 rounded-md font-bold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        <FiRefreshCw
          size={16}
          className={isLoading ? "animate-spin" : ""}
        />
        {cooldown > 0
          ? `Resend available in ${cooldown}s`
          : isLoading
          ? "Sending..."
          : "Resend verification email"}
      </button>

      <div className="pt-6 border-t border-gray-50">
        <p className="text-sm text-gray-500 font-medium">
          Wrong email?{" "}
          <Link
            href="/register"
            className="text-[var(--color-primary)] font-bold hover:underline"
          >
            Register again
          </Link>
        </p>
        <p className="text-sm text-gray-500 font-medium mt-2">
          Already verified?{" "}
          <Link
            href="/login"
            className="text-[var(--color-primary)] font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

// ২. মেইন পেজ যা Suspense দিয়ে মোড়ানো থাকবে (বিল্ড এরর সমাধানের জন্য বাধ্যতামূলক)
export default function VerifyNoticePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <Suspense fallback={<div className="text-gray-500 font-medium">Loading...</div>}>
        <VerifyNoticeContent />
      </Suspense>
    </div>
  );
}