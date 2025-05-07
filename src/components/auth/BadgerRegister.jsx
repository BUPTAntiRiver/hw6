import React, { useRef } from 'react';
import { Button, FormControl, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function BadgerRegister() {

    // TODO Create the register component.
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();
    const handleRegister = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!/^\d{7}$/.test(password)) {
            alert("Password must be 7 digits long.");
            return;
        }

        if (!username || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        fetch("https://cs571.org/rest/s25/hw6/register", {
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
        .then(res => {
            if (res.status === 200) {
                alert("Registration successful! You can now log in.");
                navigate("/");
            } else if (res.status === 409) {
                alert("Username already exists. Please choose a different username.");
            } else {
                alert("There was an error with your registration. Please try again.");
            }
        })
    }
    
    return <>
        <h1>Register</h1>
        <FormLabel>Username
        <FormControl type='text' ref={usernameRef}></FormControl></FormLabel>
        <FormLabel>Password
        <FormControl type='password' ref={passwordRef}></FormControl></FormLabel>
        <FormLabel>Confirm Password
        <FormControl type='password' ref={confirmPasswordRef}></FormControl></FormLabel>
        <Button variant='primary' onClick={() => handleRegister()}>Register</Button>
    </>
}
