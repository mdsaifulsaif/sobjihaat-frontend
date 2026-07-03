// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// export default function ResetPasswordPage() {
//   const { token } = useParams();
//   const router = useRouter();
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password/${token}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ newPassword }),
//       }
//     );

//     const data = await res.json();

//     if (data.success) {
//       setMessage("Password reset successful! Redirecting to login...");
//       setTimeout(() => router.push("/login"), 2000);
//     } else {
//       setMessage(data.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="password"
//         placeholder="New Password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//       />
//       <button type="submit">Reset Password</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }


"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const strength = getStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword: password }),
        }
      );
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setTimeout(() => router.push("/login"), 2200);
      } else {
        setStatus("error");
        setMessage(data.message || "This reset link is invalid or has expired.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please check your connection and try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brandRow}>
          <SproutMark state={status} />
          <span style={styles.brandName}>সবজিহাট</span>
        </div>

        {status === "success" ? (
          <div style={styles.body}>
            <h1 style={styles.heading}>Password updated</h1>
            <p style={styles.sub}>
              Your password has been reset. Taking you to login…
            </p>
          </div>
        ) : (
          <>
            <h1 style={styles.heading}>Set a new password</h1>
            <p style={styles.sub}>
              Choose a strong password you haven&apos;t used before.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>
                New password
                <div style={styles.inputWrap}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={styles.input}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    style={styles.toggleBtn}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </label>

              {password && (
                <div style={styles.strengthRow}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        ...styles.strengthBar,
                        background:
                          i < strength.level
                            ? strength.color
                            : "var(--color-surface)",
                      }}
                    />
                  ))}
                  <span style={{ ...styles.strengthLabel, color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}

              <label style={styles.label}>
                Confirm new password
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  style={styles.input}
                />
              </label>

              {message && <p style={styles.errorText}>{message}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  ...styles.primaryBtn,
                  opacity: status === "submitting" ? 0.7 : 1,
                  cursor: status === "submitting" ? "default" : "pointer",
                }}
              >
                {status === "submitting" ? "Updating…" : "Reset password"}
              </button>
            </form>

            <Link href="/login" style={styles.textLink}>
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function getStrength(pw: string) {
  if (!pw) return { level: 0, label: "", color: "var(--color-text-muted)" };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10 && /[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++;
  if (pw.length >= 10 && /[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { level: 1, label: "Weak", color: "var(--color-error)" };
  if (score === 2) return { level: 2, label: "Okay", color: "var(--color-warning)" };
  return { level: 3, label: "Strong", color: "var(--color-success)" };
}

function SproutMark({ state }: { state: Status }) {
  const success = state === "success";
  return (
    <span style={styles.markWrap}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle
          cx="17"
          cy="17"
          r="16"
          fill={success ? "var(--color-primary)" : "var(--color-surface)"}
          style={{ transition: "all .4s ease" }}
        />
        <path
          d="M17 23V14"
          stroke={success ? "#FFFFFF" : "var(--color-primary)"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M17 14C17 14 13.5 14.5 13 11C13 11 17.5 10 17 14Z"
          fill={success ? "#FFFFFF" : "var(--color-primary)"}
        />
        <path
          d="M17 14C17 14 20.5 14.5 21 11C21 11 16.5 10 17 14Z"
          fill={success ? "#FFFFFF" : "var(--color-primary)"}
        />
      </svg>
    </span>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
        stroke="var(--color-text-muted)"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" stroke="var(--color-text-muted)" strokeWidth="1.8" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M7.4 7.6C4.7 9.1 3 12 3 12s4 7 11 7c1.6 0 3-.3 4.3-.9M14.1 5.2c-.7-.1-1.4-.2-2.1-.2-7 0-11 7-11 7"
        stroke="var(--color-text-muted)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--color-surface)",
    padding: "24px",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "var(--color-background)",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(30, 41, 59, 0.06)",
    padding: "36px 32px 40px",
    textAlign: "center",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 28,
  },
  markWrap: { display: "inline-flex" },
  brandName: {
    fontSize: 17,
    fontWeight: 700,
    color: "var(--color-text-primary)",
    letterSpacing: "0.2px",
  },
  body: { display: "flex", flexDirection: "column", alignItems: "center" },
  heading: {
    fontSize: 21,
    fontWeight: 700,
    color: "var(--color-text-primary)",
    margin: "0 0 8px",
    textAlign: "center",
  },
  sub: {
    fontSize: 14.5,
    color: "var(--color-text-secondary)",
    lineHeight: 1.6,
    margin: "0 0 24px",
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: 16, textAlign: "left" },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-text-secondary)",
  },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 40px 11px 14px",
    fontSize: 14.5,
    borderRadius: 10,
    border: "1.5px solid #E2E8F0",
    outline: "none",
    color: "var(--color-text-primary)",
    background: "var(--color-background)",
  },
  toggleBtn: {
    position: "absolute",
    right: 12,
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    display: "flex",
  },
  strengthRow: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: -8,
  },
  strengthBar: {
    height: 4,
    flex: 1,
    borderRadius: 4,
    transition: "background .25s ease",
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: 600,
    marginLeft: 6,
    whiteSpace: "nowrap",
  },
  errorText: {
    fontSize: 13,
    color: "var(--color-error)",
    margin: "-6px 0 0",
  },
  primaryBtn: {
    background: "var(--color-primary)",
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: 600,
    padding: "13px 0",
    borderRadius: 10,
    border: "none",
    marginTop: 4,
  },
  textLink: {
    display: "inline-block",
    marginTop: 20,
    fontSize: 13.5,
    color: "var(--color-text-secondary)",
    textDecoration: "none",
  },
};