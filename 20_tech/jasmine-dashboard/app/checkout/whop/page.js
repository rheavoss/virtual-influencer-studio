export default function WhopCheckout() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontWeight: 800, color: '#0969da' }}>WHOP Secure Checkout (International)</h1>
      <p style={{ color: '#57606a', marginTop: 10 }}>
        You have been routed to our global subscription gateway.
      </p>
      
      <div style={{ marginTop: 40, padding: 20, border: '1px solid #d0d7de', borderRadius: 8, background: '#f6f8fa' }}>
        <p style={{ fontWeight: 600, color: '#1f2328' }}>International Credit Cards / Subs Expected Here</p>
        <p style={{ fontSize: 14, color: '#8c959f', marginTop: 10 }}>
          [Developer Note: Embed the WHOP checkout component or iframe here when live. Switch to Paddle MoR later.]
        </p>
      </div>
    </div>
  );
}
