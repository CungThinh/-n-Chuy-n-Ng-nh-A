import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { bookingId, status } = req.body;

      // Chuyển đổi bookingId từ chuỗi sang số nguyên
      const bookingIdInt = parseInt(bookingId, 10);

      // Kiểm tra xem `bookingId` có tồn tại trong bảng `Payment` không
      const existingPayment = await prisma.payment.findUnique({
        where: { bookingId: parseInt(bookingId, 10) },
      });

      if (!existingPayment) {
        console.error(
          "Không tìm thấy bản ghi Payment cho bookingId:",
          bookingId,
        );

        return res.status(404).json({
          error: "Không tìm thấy bản ghi Payment cho bookingId đã cung cấp.",
        });
      }

      // Cập nhật trạng thái thanh toán cho bookingId
      // Tìm kiếm và cập nhật trạng thái thanh toán cho `bookingId`
      const payment = await prisma.payment.update({
        where: { bookingId: parseInt(bookingId, 10) },
        data: { status },
      });

      return res.status(200).json({
        message: `Payment status updated to ${status}`,
        payment: payment,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);

      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi khi cập nhật trạng thái thanh toán." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
