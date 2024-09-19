import prisma from "@/lib/prisma";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}