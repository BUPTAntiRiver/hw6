import React, { useContext } from 'react';
import { useRef } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { useNavigate } from 'react-router';

export default function BadgerLogin() {

    // TODO Create the login component.
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const handleLogin = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!/^\d{7}$/.test(password)) {
            alert("Password must be 7 digits long.");
            return;
        }

        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        fetch("https://cs571.org/rest/s25/hw6/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                pin: password
            })
        })
        .then((res) => {
            if (res.status === 200) {
                alert("Login successful!");
                sessionStorage.setItem("loginStatus", "true");
                setLoginStatus(true);
                navigate("/");
            } else if (res.status === 401) {
                alert("Invalid username or password. Please try again.");
            } else {
                alert("There was an error with your login. Please try again.");
            }
        })
    }

    return <>
        <h1>Login</h1>
        <p>Username</p>
        <FormControl type='text' ref={usernameRef}></FormControl>
        <p>Password</p>
        <FormControl type='password' ref={passwordRef}></FormControl>
        <Button variant='primary' onClick={() => handleLogin()}>Login</Button>
    </>
}
