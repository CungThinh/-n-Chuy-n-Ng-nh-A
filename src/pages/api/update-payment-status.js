import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { session_id } = req.body;

    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);

      if (session && session.payment_status !== 'paid') {
        await stripe.checkout.sessions.expire(session_id);
        return res.status(200).json({ message: 'Phiên thanh toán đã được hủy.' });
      } else {
        return res.status(400).json({ error: 'Phiên thanh toán không hợp lệ hoặc đã được thanh toán.' });
      }
    } catch (error) {
      console.error('Stripe Error:', error);
      return res.status(500).json({ error: 'Đã xảy ra lỗi khi kết nối đến Stripe API.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
