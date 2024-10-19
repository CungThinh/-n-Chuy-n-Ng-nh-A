import prisma from "@/lib/prisma";
import { decryptPNR } from "@/utils";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { pnrId } = req.body;
    const decrypted_pnr = decryptPNR(pnrId)

    if (!decrypted_pnr) {
      return res.status(400).json({ message: 'PNR ID is required' });
    }

    try {
      // Tìm kiếm booking dựa trên pnr_id
      const booking = await prisma.booking.findUnique({
        where: { pnrId: decrypted_pnr },
        include: {
          contactCustomer: true,
          tickets: true,
          payment: true,
        },
      });

      // Nếu không tìm thấy booking
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      // Trả về dữ liệu booking
      return res.status(200).json(booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}