import { HiChevronRight } from "react-icons/hi2";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  /** Section title text */
  title: string;
  /** Icon shown before the title */
  icon?: ReactNode;
  /** Label for the right side button, e.g. "See all". Button only renders if both actionLabel and onAction are given */
  actionLabel?: string;
  /** Click handler for the right side button */
  onAction?: () => void;
  /** Extra classes for the outer wrapper */
  className?: string;
}

/**
 * Reusable section header.
 *
 * Usage:
 * <SectionHeader title="Fresh vegetables" icon={<Leaf size={18} />} actionLabel="See all" onAction={() => router.push("/vegetables")} />
 * <SectionHeader title="Best sellers" /> // no button
 */
export default function SectionHeader({
  title,
  icon,
  actionLabel = "",
  onAction,
  className = "",
}: SectionHeaderProps) {
  const showAction = Boolean(actionLabel && onAction);

  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="flex items-center gap-2">
        {icon && (
          <span
            className="flex items-center justify-center"
            style={{ color: "var(--color-primary)" }}
          >
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

      {showAction && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-1 transition-colors"
          style={{
            fontSize: "var(--font-size-sm)",
            fontWeight: 500,
            color: "var(--color-primary)",
          }}
        >
          {actionLabel}
          <HiChevronRight size={16} />
        </button>
      )}
    </div>
  );
}