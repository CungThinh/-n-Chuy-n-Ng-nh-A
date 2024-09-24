'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("/api/auth/register", formData);

            if (res.status === 201) {
                router.push("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Có lỗi xảy ra trong quá trình đăng ký.");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    )
}