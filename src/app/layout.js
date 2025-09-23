import "./globals.css";

export const metadata = {
  title: "FinsureTex",
  description: "Upload, edit, and export CSV data.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}