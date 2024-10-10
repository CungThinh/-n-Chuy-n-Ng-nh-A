import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const range = JSON.parse(req.query.range || '[0,9]');
      const skip = range[0];
      const take = range[1] - range[0] + 1;

      const bookings = await prisma.booking.findMany({
        skip,
        take,
        include: {
          contactCustomer: true, // Bao gồm liên kết với ContactCustomer
          tickets: true,         // Bao gồm các vé liên quan
          payment: true          // Bao gồm thông tin Payment nếu có
        }
      });

      const total = await prisma.booking.count();

      res.setHeader('Content-Range', `bookings ${range[0]}-${range[1]}/${total}`);
      res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else if (req.method === 'POST') {
    try {
      const { contactCustomerId, isRoundTrip, tickets, payment } = req.body;

      const booking = await prisma.booking.create({
        data: {
          contactCustomerId,
          isRoundTrip,
          tickets: {
            create: tickets // Tạo danh sách vé mới
          },
          payment: payment ? { create: payment } : undefined // Tạo payment nếu có
        }
      });
      return res.status(201).json({
        message: 'Booking added successfully',
        booking: booking,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}