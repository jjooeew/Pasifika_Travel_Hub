import { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link } from "react-router-dom";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      await signUp(email, password);
    } catch (err) {
      alert("Signed up successfully!");
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button onClick={handleRegister}>Sign Up</button>
      <Link to={"/login"}>Click here to login</Link>
    </div>
  );
}
