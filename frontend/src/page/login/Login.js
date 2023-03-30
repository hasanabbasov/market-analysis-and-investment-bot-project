import React, { useState } from "react";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import {Typography} from "@mui/joy";
import { useNavigate } from 'react-router-dom';
import "./login.css"



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error("Giriş yapılamadı");
            }
            const data = await response.json();
            console.log("Giriş başarılı!", data);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="login-card-background"><FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    // html input attribute
                    name="email"
                    type="email"
                    placeholder="johndoe@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        style={{color:"white"}}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button sx={{mt: 1 /* margin top */}} type="submit">
                    Log in
                </Button>
                <Typography
                    endDecorator={<Link href="/register">Sign up</Link>}
                    fontSize="sm"
                    sx={{alignSelf: 'center'}}
                >
                    Don't have an account?
                </Typography></div>
        </form>
    );
};



export default Login;

