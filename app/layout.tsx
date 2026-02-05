import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <div className="min-h-screen pb-16">
          {children}
        </div>
      </body>
    </html>
  );
}
