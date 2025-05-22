import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../UI/notifications/notifications";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/register", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ name, email, password })
        })
        .then(async res => {
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.errors?.join(", ") || err.message || "Error al registrar");
            }

            return res.json();
        })
        .then(() => {
            successToast("¡Usuario creado exitosamente!");
            navigate("/login");
        })
        .catch(err => {
            console.error(err);
            alert(`Error: ${err.message}`);
        });

    };

    return (
        <div className="container mt-5">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default Register;
