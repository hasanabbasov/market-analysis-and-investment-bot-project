import React, { useState } from "react";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import {Typography} from "@mui/joy";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import "./login.css"
import BackgroundLogo from "../../styles/background.jpeg";



const Login = () => {
    const [userName, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // console.log("userName",userName)
    // console.log("password",password)

    const handleLogin =  (e) => {
        e.preventDefault();
        fetch(`/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
            }),
        })
            .then((res) => {
                return res.json(); // sonucu değişkene atayın
            })
            .then((result) => {
                console.log("success", result.userId); // sonucu konsola yazdırın
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("currentUserId", result.userId);
                localStorage.setItem("currentUserName", result.userName)
                navigate('/dashboard');
                window.reload()
            })
            .catch((err) => {
                setError(true);
                    console.log(err)
                setTimeout(() => {
                    setError(false);
                }, 3000);
                }
            ).finally(() => {
            let userId = localStorage.getItem("currentUserId")
            fetch(`http://127.0.0.1:5000/currentUserId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentUserId: userId,
                    urlId: null
                }),
            })
                .then((response) => response.json())
                .then((data) => console.log("currenUserId send to flask", data))
                .catch((error) => console.log(error));
        })
    }


    const errorToast = () =>{
        return(
            <div style={{position:"fixed", top:"90%"}}><Stack sx={{width: '100%'}} spacing={2}>
                <Alert variant="filled" severity="error">
                   Password or Nick is wrong! Pls try again
                </Alert>
            </Stack></div>
        )
    }


    return (
        <>
            <div className="background-image">
                <img src={BackgroundLogo} alt="Background" className="background-image__logo" />
            <div>
                <form onSubmit={handleLogin}>
                    <div className="login-card-background"><FormControl>
                        <FormLabel>Nick</FormLabel>
                        <Input
                            // html input attribute
                            name="nick"
                            type="text"
                            placeholder="traderOnline"
                            onChange={(e) => setNick(e.target.value)}
                        />
                    </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                name="password"
                                type="password"
                                style={{color: "black"}}
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
                        </Typography>
                    </div>
                    { error &&
                        errorToast()
                    }
                </form>
            </div>

             <div>

             </div>
            </div>
        </>
    );
};



export default Login;

