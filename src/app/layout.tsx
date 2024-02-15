import "../../tailwind.config";
import "../styles/global.css";

export const metadata = {
  title: "pick",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="">{children}</body>
    </html>
  );
}