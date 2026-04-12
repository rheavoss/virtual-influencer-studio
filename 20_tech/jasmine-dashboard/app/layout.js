export const metadata = {
  title: 'Virtual Influencer — P&L Dashboard',
  description: '12-month revenue and profit projection — Virtual Influencer Digital Agency',
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
