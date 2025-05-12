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
    }

    fetch("http://localhost:3000/register", {
        headers:{
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name, email, password })
    })
        .then(res => res.json())
        .then(() => {
            successToast("¡Ususario creado exitosamente!")
            navigate("/login");
        })
        .catch(err => console.log(err))
}

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
)

export default Register;