import { HiChevronRight } from "react-icons/hi2";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className = "",
}: SectionHeaderProps) {
  const showAction = Boolean(actionLabel && onAction);

  return (
   <div className={showAction ? "text-left" : "text-center"}>
  <div
    className={`flex items-center gap-2 ${
      showAction ? "justify-start" : "justify-center"
    }`}
  >
    {icon && (
      <span className="text-[var(--color-primary)]">
        {icon}
      </span>
    )}

    <h2
      className="font-semibold"
      style={{
        fontSize: "var(--font-size-xl)",
        color: "var(--color-text-primary)",
      }}
    >
      {title}
    </h2>
  </div>

  {description && (
    <p
      className="mt-1"
      style={{
        fontSize: "var(--font-size-sm)",
        color: "var(--color-text-secondary)",
      }}
    >
      {description}
    </p>
  )}
</div>
  );
}