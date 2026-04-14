export default function CashfreeCheckout() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontWeight: 800, color: '#1a7f37' }}>Cashfree Secure Checkout (India)</h1>
      <p style={{ color: '#57606a', marginTop: 10 }}>
        You have been securely routed to our localized gateway for India.
      </p>
      
      <div style={{ marginTop: 40, padding: 20, border: '1px solid #d0d7de', borderRadius: 8, background: '#f6f8fa' }}>
        <p style={{ fontWeight: 600, color: '#1f2328' }}>UPI / Net Banking Expected Here</p>
        <p style={{ fontSize: 14, color: '#8c959f', marginTop: 10 }}>
          [Developer Note: Embed the Cashfree React SDK or Payment Link Button here when live.]
        </p>
      </div>
    </div>
  );
}
