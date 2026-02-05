import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-200">
        <div className="min-h-screen pb-16">
          {children}
        </div>
      </body>
    </html>
  );
}
