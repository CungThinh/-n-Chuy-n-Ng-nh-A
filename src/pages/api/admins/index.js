import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Lấy thông tin từ query range
      const range = JSON.parse(req.query.range || "[0,9]");
      const skip = range[0]; // Bắt đầu từ đâu
      const take = range[1] - range[0] + 1; // Số lượng lấy

      // Lấy dữ liệu admin từ bảng Admin
      const admins = await prisma.admin.findMany({
        skip,
        take,
      });

      // Tính tổng số admin trong bảng
      const total = await prisma.admin.count();

      // Thiết lập headers Content-Range và Access-Control
      res.setHeader("Content-Range", `admins ${range[0]}-${range[1]}/${total}`);
      res.setHeader("Access-Control-Expose-Headers", "Content-Range");

      // Trả về danh sách admin
      res.status(200).json(admins);
    } catch (error) {
      // Xử lý lỗi
      res.status(500).json({ error: "Something went wrong" });
    }
  } else if (req.method === "POST") {
    try {
      // Nhận dữ liệu từ body của request
      const { email, password, name } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo một admin mới trong cơ sở dữ liệu
      const admin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      return res.status(201).json({
        message: "Admin added successfully",
        admin: admin,
      });
    } catch (error) {
      // Xử lý lỗi
      res.status(500).json({ error: error.message });
    }
  } else {
    // Nếu phương thức không phải GET hay POST
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
