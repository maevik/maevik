import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  name: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
}

export default function Button({
  icon,
  name,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center backdrop-blur-xl border transition-all duration-300 font-medium rounded-xl hover:scale-105 active:scale-95";

  const variantStyles = {
    primary:
      "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30",
    secondary:
      "bg-black/20 border-white/10 text-white hover:bg-black/30 hover:border-white/20",
    danger:
      "bg-red-500/20 border-red-400/30 text-red-100 hover:bg-red-500/30 hover:border-red-400/50",
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm gap-2",
    md: "px-4 py-3 text-base gap-3",
    lg: "px-6 py-4 text-lg gap-4",
  };

  const buttonContent = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className={size === "sm" ? "text-xs" : "text-sm"}>{name}</span>
    </>
  );

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
        >
          {buttonContent}
        </a>
      );
    }

    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses} type="button">
      {buttonContent}
    </button>
  );
}
