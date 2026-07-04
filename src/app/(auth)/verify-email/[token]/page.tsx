// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams, useRouter } from "next/navigation";

// // export default function VerifyEmailPage() {
// //   const { token } = useParams();
// //   const router = useRouter();
// //   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     const verify = async () => {
// //       try {
// //         const res = await fetch(
// //           `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email/${token}`,
// //           {
// //             method: "POST",
// //             credentials: "include", // cookie সেট হওয়ার জন্য জরুরি
// //           }
// //         );

// //         const data = await res.json();

// //         if (data.success) {
// //           setStatus("success");
// //           setMessage("Email verified successfully!");
// //           setTimeout(() => router.push("/dashboard"), 2000);
// //         } else {
// //           setStatus("error");
// //           setMessage(data.message || "Verification failed");
// //         }
// //       } catch (err) {
// //         setStatus("error");
// //         setMessage("Something went wrong");
// //       }
// //     };

// //     if (token) verify();
// //   }, [token]);

// //   return (
// //     <div>
// //       {status === "loading" && <p>Verifying your email...</p>}
// //       {status === "success" && <p>{message} Redirecting...</p>}
// //       {status === "error" && <p>{message}</p>}
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";

// type Status = "loading" | "success" | "error";

// export default function VerifyEmailPage() {
//   const { token } = useParams<{ token: string }>();
//   const router = useRouter();
//   const [status, setStatus] = useState<Status>("loading");
//   const [message, setMessage] = useState("");
//   const hasRun = useRef(false);

//   useEffect(() => {
//     if (!token || hasRun.current) return;
//     hasRun.current = true;

//     const verify = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email/${token}`,
//           { method: "POST", credentials: "include" }
//         );
//         const data = await res.json();

//         if (data.success) {
//           setStatus("success");
//           setMessage(data.message || "Your email has been verified.");
//           setTimeout(() => router.push("/"), 2500);
//         } else {
//           setStatus("error");
//           setMessage(data.message || "This verification link is invalid or has expired.");
//         }
//       } catch {
//         setStatus("error");
//         setMessage("Something went wrong. Please check your connection and try again.");
//       }
//     };

//     verify();
//   }, [token, router]);

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <div style={styles.brandRow}>
//           <SproutMark state={status} />
//           <span style={styles.brandName}>সবজিহাট</span>
//         </div>

//         <div style={styles.body}>
//           {status === "loading" && (
//             <>
//               <h1 style={styles.heading}>Verifying your email</h1>
//               <p style={styles.sub}>Hang tight, this only takes a moment.</p>
//               <Spinner />
//             </>
//           )}

//           {status === "success" && (
//             <>
//               <h1 style={styles.heading}>Email verified</h1>
//               <p style={styles.sub}>{message}</p>
//               <p style={styles.hint}>Taking you to সবজিহাট…</p>
//             </>
//           )}

//           {status === "error" && (
//             <>
//               <h1 style={{ ...styles.heading, color: "var(--color-error)" }}>
//                 Verification failed
//               </h1>
//               <p style={styles.sub}>{message}</p>
//               <Link href="/resend-verification" style={styles.primaryBtn}>
//                 Resend verification email
//               </Link>
//               <Link href="/login" style={styles.textLink}>
//                 Back to login
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- Signature element: sprout mark ---------- */
// /* Loading = seed pulsing. Success = leaves unfurl. Error = wilted, muted. */
// function SproutMark({ state }: { state: Status }) {
//   return (
//     <span style={styles.markWrap}>
//       <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
//         <circle
//           cx="17"
//           cy="17"
//           r="16"
//           fill={
//             state === "success"
//               ? "var(--color-primary)"
//               : state === "error"
//               ? "var(--color-text-muted)"
//               : "var(--color-surface)"
//           }
//           stroke={state === "loading" ? "var(--color-primary)" : "transparent"}
//           strokeWidth="1.5"
//           style={{ transition: "all .4s ease" }}
//         />
//         <path
//           d="M17 23V14"
//           stroke={state === "loading" ? "var(--color-primary)" : "#FFFFFF"}
//           strokeWidth="2"
//           strokeLinecap="round"
//           style={{
//             opacity: state === "error" ? 0.5 : 1,
//             transition: "opacity .3s ease",
//           }}
//         />
//         <path
//           d="M17 14C17 14 13.5 14.5 13 11C13 11 17.5 10 17 14Z"
//           fill={state === "loading" ? "var(--color-primary)" : "#FFFFFF"}
//           style={{
//             transformOrigin: "17px 14px",
//             transform: state === "success" ? "scale(1)" : "scale(0.85)",
//             opacity: state === "error" ? 0.5 : 1,
//             transition: "all .4s ease .1s",
//           }}
//         />
//         <path
//           d="M17 14C17 14 20.5 14.5 21 11C21 11 16.5 10 17 14Z"
//           fill={state === "loading" ? "var(--color-primary)" : "#FFFFFF"}
//           style={{
//             transformOrigin: "17px 14px",
//             transform: state === "success" ? "scale(1)" : "scale(0.85)",
//             opacity: state === "error" ? 0.5 : 1,
//             transition: "all .4s ease .2s",
//           }}
//         />
//       </svg>
//     </span>
//   );
// }

// function Spinner() {
//   return (
//     <>
//       <div style={styles.spinner} />
//       <style>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @media (prefers-reduced-motion: reduce) {
//           * { animation-duration: 0.01ms !important; }
//         }
//       `}</style>
//     </>
//   );
// }

// const styles: Record<string, React.CSSProperties> = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "var(--color-surface)",
//     padding: "24px",
//     fontFamily:
//       "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//   },
//   card: {
//     width: "100%",
//     maxWidth: 420,
//     background: "var(--color-background)",
//     borderRadius: 16,
//     boxShadow: "0 4px 24px rgba(30, 41, 59, 0.06)",
//     padding: "36px 32px 40px",
//     textAlign: "center",
//   },
//   brandRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 10,
//     marginBottom: 28,
//   },
//   markWrap: { display: "inline-flex" },
//   brandName: {
//     fontSize: 17,
//     fontWeight: 700,
//     color: "var(--color-text-primary)",
//     letterSpacing: "0.2px",
//   },
//   body: { display: "flex", flexDirection: "column", alignItems: "center" },
//   heading: {
//     fontSize: 21,
//     fontWeight: 700,
//     color: "var(--color-text-primary)",
//     margin: "0 0 8px",
//   },
//   sub: {
//     fontSize: 14.5,
//     color: "var(--color-text-secondary)",
//     lineHeight: 1.6,
//     margin: "0 0 24px",
//     maxWidth: 320,
//   },
//   hint: {
//     fontSize: 13,
//     color: "var(--color-text-muted)",
//     margin: 0,
//   },
//   spinner: {
//     width: 28,
//     height: 28,
//     borderRadius: "50%",
//     border: "3px solid var(--color-surface)",
//     borderTopColor: "var(--color-primary)",
//     animation: "spin 0.8s linear infinite",
//   },
//   primaryBtn: {
//     display: "inline-block",
//     background: "var(--color-primary)",
//     color: "#FFFFFF",
//     fontSize: 14.5,
//     fontWeight: 600,
//     padding: "12px 28px",
//     borderRadius: 10,
//     textDecoration: "none",
//     marginBottom: 14,
//   },
//   textLink: {
//     fontSize: 13.5,
//     color: "var(--color-text-secondary)",
//     textDecoration: "none",
//   },
// };



"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useVerifyEmailMutation } from "@/redux/api/authApi";
import { FiCheck, FiX } from "react-icons/fi";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [verifyEmail] = useVerifyEmailMutation();

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    verifyEmail(token)
      .unwrap()
      .then((data) => {
        setStatus("success");
        setMessage(data?.message || "Your email has been verified.");
        setTimeout(() => router.push("/"), 2500);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(
          err?.data?.message ||
            "This verification link is invalid or has expired."
        );
      });
  }, [token, router, verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-[420px] bg-white p-8 rounded-md shadow-2xl shadow-gray-200 border border-gray-100 text-center">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <SproutMark state={status} />
          <span className="text-lg font-black text-gray-900">সবজিহাট</span>
        </div>

        {status === "loading" && (
          <>
            <h1 className="text-2xl font-black text-gray-900 mb-2">
              Verifying your email
            </h1>
            <p className="text-gray-500 font-medium mb-8">
              Hang tight, this only takes a moment.
            </p>
            <div className="w-8 h-8 mx-auto border-[3px] border-gray-100 border-t-[var(--color-primary)] rounded-full animate-spin" />
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-black text-gray-900 mb-2">
              Email verified
            </h1>
            <p className="text-gray-500 font-medium mb-2">{message}</p>
            <p className="text-xs text-gray-400 font-medium">
              Taking you to সবজিহাট…
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-black text-red-500 mb-2">
              Verification failed
            </h1>
            <p className="text-gray-500 font-medium mb-8">{message}</p>

            <Link
              href="/resend-verification"
              className="block w-full py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-md font-bold shadow-xl hover:shadow-gray-200 hover:scale-[1.01] active:scale-[0.99] transition-all mb-4"
            >
              Resend verification email
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

/* Signature element: sprout mark — loading pulses, success unfurls, error wilts */
function SproutMark({ state }: { state: Status }) {
  const bg =
    state === "success"
      ? "bg-[var(--color-primary)]"
      : state === "error"
      ? "bg-gray-300"
      : "bg-gray-50";
  const stroke = state === "loading" ? "border border-[var(--color-primary)]" : "";
  const iconColor = state === "loading" ? "text-[var(--color-primary)]" : "text-white";

  return (
    <span
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${bg} ${stroke} transition-colors duration-300`}
    >
      {state === "success" ? (
        <FiCheck className="text-white" size={18} strokeWidth={3} />
      ) : state === "error" ? (
        <FiX className="text-white" size={18} strokeWidth={3} />
      ) : (
        <svg width="18" height="18" viewBox="0 0 34 34" fill="none">
          <path
            d="M17 23V14"
            stroke="currentColor"
            className={iconColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M17 14C17 14 13.5 14.5 13 11C13 11 17.5 10 17 14Z"
            fill="currentColor"
            className={iconColor}
          />
          <path
            d="M17 14C17 14 20.5 14.5 21 11C21 11 16.5 10 17 14Z"
            fill="currentColor"
            className={iconColor}
          />
        </svg>
      )}
    </span>
  );
}