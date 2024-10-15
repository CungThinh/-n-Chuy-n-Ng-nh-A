import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const { passportNumber } = req.query;

    // Xử lý khi phương thức là GET (Lấy thông tin Ticket theo ID)  
    if (req.method === 'GET') {
        try {
            const tickets = await prisma.ticket.findMany({
                where: {
                    passportNumber: passportNumber
                },
            });

            if (tickets.length === 0) {
                return res.status(404).json({
                    message: 'Ticket not found',
                });
            }

            return res.status(200).json(tickets);
        } catch (error) {
            console.error('Error fetching ticket:', error);
            return res.status(500).json({
                message: 'Error fetching ticket',
                error: error.message,
            });
        }
    }
    // Trả về lỗi nếu không phải là GET, DELETE, hoặc PUT
    else {
        return res.status(405).json({
            message: 'Method Not Allowed',
        });
    }
}