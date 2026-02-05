export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
}) {
  const base = "rounded-lg py-2.5 text-sm font-bold active:scale-[0.98] transition-all duration-200";
  const primary = "bg-blue-600 text-white hover:bg-blue-700";
  const outline = "bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:border-slate-600";

  const classes = `${base} ${variant === "outline" ? outline : primary} ${className}`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}