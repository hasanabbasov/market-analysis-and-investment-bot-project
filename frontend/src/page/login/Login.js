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



const Login = () => {
    const [userName, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

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
                console.log("success", result); // sonucu konsola yazdırın
                navigate('/main');
            })
            .catch((err) => {
                setError(true);
                    console.log(err)
                setTimeout(() => {
                    setError(false);
                }, 3000);
                }
            )
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
                                style={{color: "white"}}
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
        </>
    );
};



export default Login;

