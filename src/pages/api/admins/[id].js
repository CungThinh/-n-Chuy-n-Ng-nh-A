import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  // Xử lý khi phương thức là GET (Lấy thông tin admin theo ID)
  if (req.method === "GET") {
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          id: parseInt(id), // Chuyển đổi id thành số nguyên
        },
      });

      if (!admin) {
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      return res.status(200).json(admin);
    } catch (error) {
      console.error("Error fetching admin:", error);

      return res.status(500).json({
        message: "Error fetching admin",
        error: error.message,
      });
    }
  }

  // Xử lý khi phương thức là DELETE (Xóa admin theo ID)
  else if (req.method === "DELETE") {
    try {
      const deletedAdmin = await prisma.admin.delete({
        where: {
          id: parseInt(id), // Chuyển đổi id thành số nguyên
        },
      });

      return res.status(200).json({
        message: "Admin deleted successfully",
        admin: deletedAdmin,
      });
    } catch (error) {
      console.error("Error deleting admin:", error);

      return res.status(500).json({
        message: "Error deleting admin",
        error: error.message,
      });
    }
  }

  // Xử lý khi phương thức là PUT (Cập nhật thông tin admin theo ID)
  else if (req.method === "PUT") {
    try {
      const { email, password, name } = req.body;

      // Cập nhật admin dựa trên ID
      const updatedAdmin = await prisma.admin.update({
        where: {
          id: parseInt(id), // Chuyển đổi id thành số nguyên
        },
        data: {
          email,
          password,
          name,
        },
      });

      return res.status(200).json({
        message: "Admin updated successfully",
        admin: updatedAdmin,
      });
    } catch (error) {
      console.error("Error updating admin:", error);

      return res.status(500).json({
        message: "Error updating admin",
        error: error.message,
      });
    }
  }

  // Trả về lỗi nếu không phải là GET, DELETE, hoặc PUT
  else {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
