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
  const base = "rounded-xl py-2 text-sm font-semibold active:scale-[0.98] transition-all duration-200 shadow-md";
  const primary = "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800";
  const outline = "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50";

  const classes = `${base} ${variant === "outline" ? outline : primary} ${className}`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}