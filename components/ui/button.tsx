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
  const base = "rounded-lg py-2.5 px-4 text-sm font-semibold active:scale-[0.98] transition-all duration-200";
  const primary = "bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md";
  const outline = "bg-white text-slate-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400";

  const classes = `${base} ${variant === "outline" ? outline : primary} ${className}`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}