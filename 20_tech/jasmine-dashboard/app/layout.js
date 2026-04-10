export const metadata = {
  title: 'Jasmine — P&L Dashboard',
  description: '12-month revenue and profit projection — Jasmine AI Influencer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0d1117' }}>
        {children}
      </body>
    </html>
  );
}
