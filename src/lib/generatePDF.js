import path from "path";

import PDFDocument from "pdfkit";

export async function generateInvoicePDF(bookingData) {
  return new Promise((resolve, reject) => {
    try {
      // Create PDF with explicit font configuration
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        bufferPages: true,
        lang: "vi",
        autoFirstPage: true,
      });

      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        let pdfData = Buffer.concat(buffers);

        resolve(pdfData);
      });

      // Register fonts with proper encoding
      const fontPath = path.join(process.cwd(), "public", "fonts");

      doc.registerFont("NotoSans", path.join(fontPath, "NotoSans-Regular.ttf"));
      doc.registerFont(
        "NotoSans-Bold",
        path.join(fontPath, "NotoSans-Bold.ttf"),
      );

      // Set default font
      doc.font("NotoSans");

      // Logo
      const logoPath = path.join(
        process.cwd(),
        "public",
        "images",
        "iconlogo2.png",
      );

      doc.image(logoPath, 50, 50, { width: 130 });

      // Invoice number (top right)
      doc
        .font("NotoSans-Bold")
        .fontSize(14)
        .text("MÃ HÓA ĐƠN", 400, 70)
        .fontSize(12)
        .text(`#${bookingData.pnrId}`, 400, 90);

      // Customer name and info
      doc.font("NotoSans-Bold").fontSize(24).text("HÓA ĐƠN", 50, 130);

      doc
        .font("NotoSans-Bold")
        .fontSize(14)
        .text(
          bookingData.customers[0].firstName +
            " " +
            bookingData.customers[0].lastName,
          50,
          180,
        );

      // Customer details
      doc
        .font("NotoSans")
        .fontSize(10)
        .text("Email:", 50, 210)
        .text(bookingData.user.email, 150, 210)
        .text("Quốc tịch:", 50, 230)
        .text(bookingData.customers[0].nationality || "Vietnam", 150, 230);

      // Table headers
      const startY = 280;

      doc
        .font("NotoSans-Bold")
        .fontSize(10)
        .text("MỤC", 50, startY)
        .text("SỐ LƯỢNG", 300, startY)
        .text("ĐƠN GIÁ", 400, startY)
        .text("THÀNH TIỀN", 480, startY);

      // Draw header line
      doc
        .moveTo(50, startY + 20)
        .lineTo(550, startY + 20)
        .stroke();

      // Table content
      let currentY = startY + 40;

      // Add outbound flight
      const outboundFlight = bookingData.tickets.find(
        (t) => t.tripType === "Outbound",
      );

      if (outboundFlight) {
        doc
          .font("NotoSans")
          .text(
            `Vé máy bay ${outboundFlight.departureAirport} - ${outboundFlight.arrivalAirport}`,
            50,
            currentY,
          )
          .text("1", 320, currentY)
          .text(
            Math.round(bookingData.totalAmount / 2).toLocaleString("vi-VN"),
            400,
            currentY,
          )
          .text(
            Math.round(bookingData.totalAmount / 2).toLocaleString("vi-VN"),
            480,
            currentY,
          );
        currentY += 30;
      }

      // Add return flight if exists
      const returnFlight = bookingData.tickets.find(
        (t) => t.tripType === "Return",
      );

      if (returnFlight) {
        doc
          .font("NotoSans")
          .text(
            `Vé máy bay ${returnFlight.departureAirport} - ${returnFlight.arrivalAirport}`,
            50,
            currentY,
          )
          .text("1", 320, currentY)
          .text(
            Math.round(bookingData.totalAmount / 2).toLocaleString("vi-VN"),
            400,
            currentY,
          )
          .text(
            Math.round(bookingData.totalAmount / 2).toLocaleString("vi-VN"),
            480,
            currentY,
          );
        currentY += 30;
      }

      // Draw total section
      currentY += 20;
      doc
        .font("NotoSans")
        .text("Tổng cộng", 400, currentY)
        .text(bookingData.totalAmount.toLocaleString("vi-VN"), 480, currentY);

      currentY += 20;
      doc.text("Thuế (0%)", 400, currentY).text("0", 480, currentY);

      currentY += 20;
      doc
        .font("NotoSans-Bold")
        .text("TỔNG THANH TOÁN", 350, currentY)
        .text(bookingData.totalAmount.toLocaleString("vi-VN"), 480, currentY);

      // Payment information section
      currentY += 40;
      doc
        .font("NotoSans-Bold")
        .fontSize(12)
        .text("THÔNG TIN THANH TOÁN", 50, currentY);

      currentY += 25;
      doc.font("NotoSans").fontSize(10);

      // Left column
      doc
        .text("Ngân hàng:", 50, currentY)
        .text(bookingData.payment.paymentMethod.toUpperCase(), 150, currentY)
        .text("Phí dịch vụ:", 50, currentY + 20)
        .text("0", 150, currentY + 20)
        .text("Số tài khoản:", 50, currentY + 40)
        .text("123-456-789", 150, currentY + 40)
        .text("Ngày thanh toán:", 50, currentY + 60)
        .text(new Date().toLocaleDateString("vi-VN"), 150, currentY + 60);

      // Right column
      doc
        .text("Email:", 300, currentY)
        .text(bookingData.user.email, 380, currentY)
        .text("Điện thoại:", 300, currentY + 20)
        .text("+84 912 345 678", 380, currentY + 20)
        .text("Website:", 300, currentY + 40)
        .text("www.vemaybay.vn", 380, currentY + 40);

      doc.end();
    } catch (error) {
      console.error("Error generating PDF:", error);
      reject(error);
    }
  });
}
