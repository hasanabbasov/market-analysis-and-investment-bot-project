import React, {useState} from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import {Typography} from "@mui/joy";
import Link from "@mui/joy/Link";
import "./register.css"
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            firstname: name,
            lastname: surname,
            email: email,
            password: password,
        };
        fetch(`users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                navigate('/login');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="register-card-background">
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                        // html input attribute
                        name="firstname"
                        type="text"
                        placeholder="Hasan"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Surname</FormLabel>
                    <Input
                        // html input attribute
                        name="lastname"
                        type="text"
                        placeholder="Abasov"
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        // html input attribute
                        name="email"
                        type="email"
                        placeholder="hasan.absov@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        style={{color: "white"}}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button sx={{mt: 1 /* margin top */}} type="submit">
                    Register
                </Button>
                <Typography
                    endDecorator={<Link href="/login">Log in</Link>}
                    fontSize="sm"
                    sx={{alignSelf: 'center'}}
                >
                    if you have an account
                </Typography></div>
        </form>
    );
}

export default Register;
