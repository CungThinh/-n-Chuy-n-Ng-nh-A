import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import { generatePNRCode } from "@/utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const range = JSON.parse(req.query.range || "[0,9]");
      const skip = range[0];
      const take = range[1] - range[0] + 1;

      const bookings = await prisma.booking.findMany({
        skip,
        take,
        include: {
          contactCustomer: true,
          tickets: true,
          payment: true,
        },
      });

      const total = await prisma.booking.count();

      res.setHeader(
        "Content-Range",
        `bookings ${range[0]}-${range[1]}/${total}`,
      );
      res.setHeader("Access-Control-Expose-Headers", "Content-Range");
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else if (req.method === "POST") {
    try {
      const token = await getToken({ req });
      const userId = token.id;

      console.log(userId);
      const { isRoundTrip, tickets, customers, payment, totalAmount } =
        req.body;

      console.log(req.body);
      const pnrId = generatePNRCode();
      const booking = await prisma.booking.create({
        data: {
          userId,
          isRoundTrip,
          pnrId,
          totalAmount,
          tickets: {
            create: tickets, // Tạo danh sách vé mới
          },
          customers: {
            create: customers,
          },
          payment: payment ? { create: payment } : undefined,
          status: "Upcoming",
        },
      });

      return res.status(201).json({
        message: "Booking added successfully",
        booking: booking,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
