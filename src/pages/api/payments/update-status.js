import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { bookingId, status } = req.body;

      // Chuyển đổi bookingId từ chuỗi sang số nguyên
      const bookingIdInt = parseInt(bookingId, 10);

      if (isNaN(bookingIdInt)) {
        return res.status(400).json({ error: "ID đặt chỗ không hợp lệ." });
      }

      // Kiểm tra xem payment có tồn tại không
      const paymentExists = await prisma.payment.findUnique({
        where: { bookingId: bookingIdInt },
      });

      if (!paymentExists) {
        return res.status(404).json({
          error: "Không tìm thấy thanh toán cho bookingId đã cung cấp.",
        });
      }

      // Cập nhật trạng thái thanh toán
      const payment = await prisma.payment.update({
        where: {
          bookingId: bookingIdInt, // Tìm kiếm dựa trên bookingId
        },
        data: {
          status: status, // Cập nhật trạng thái
        },
      });

      res.status(200).json({
        message: `Payment status updated to ${status}`,
        payment: payment,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
      res
        .status(500)
        .json({ error: "Đã xảy ra lỗi khi cập nhật trạng thái thanh toán." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
