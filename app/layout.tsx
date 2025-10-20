import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '港区女子マウントじゃんけん',
  description: '財力・若さ・人脈で戦う港区女子風じゃんけんゲーム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
