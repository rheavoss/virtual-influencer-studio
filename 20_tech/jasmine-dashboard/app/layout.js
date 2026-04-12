export const metadata = {
  title: 'Virtual Influencer — P&L Dashboard',
  description: '12-month revenue and profit projection — Institutional Pitch Deck',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#f6f8fa' }}>
        {children}
      </body>
    </html>
  );
}
