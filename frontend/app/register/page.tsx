"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
     if (password !== confirmPassword) {
    console.log("Passwords do not match");
    return;
  }
 const response = await fetch("http://localhost:3000/api/auth/register",{
    method:"POST",
    headers:{
    "Content-Type":"application/json"
    },
    body:
        JSON.stringify({
            name,
            email,
            password

        })
    

 });

const data= await response.json();
  
if (response.ok) {
  router.push("/login");
} else {
  console.log(data.message);
}
  };

 return (
  <div className="register-page">

    <div className="register-header">
      <h1>CoTask</h1>
    </div>

    <form className="register-content" onSubmit={handleRegister}>

      <h2>Create your account</h2>

      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          required
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password"
          required
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
        />
      </div>

      <button type="submit" id="register-submit">
        Create Account
      </button>

      <p>
        Already have an account?{" "}
        <Link href="/login" id="login-link">
          Sign In
        </Link>
      </p>

    </form>

  </div>
);
}