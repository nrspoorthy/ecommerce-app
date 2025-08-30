import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Register.css"

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        const UserDetails = { username, password }
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(UserDetails),
            })

            if (response.ok) {
                navigate("/login")
            } else {
                const data = await response.json()
                setError(data.message || "Registration failed")
            }
        }
        catch {
            setError("Couldn't fetch the data")
        }
    }

    return (
        <div className="register-wrapper">
            <div className="register-box">
                <h1 className="register-title">Create Account</h1>
                <form onSubmit={handleRegisterSubmit} className="register-form" autoComplete="off">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="new-username"
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        className="register-input"
                        required
                    />

                    <button type="submit" className="register-btn">Register</button>

                    {error && <p className="register-error">{error}</p>}
                </form>
            </div>
        </div>
    )
}
