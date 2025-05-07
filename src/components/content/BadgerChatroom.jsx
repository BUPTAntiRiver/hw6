import React, { useContext, useEffect, useState } from "react"
import BadgerMessage from "./BadgerMessage";
import { Col, FormControl, Pagination, Row, Button, Container } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useRef } from "react";


export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [active, setActive] = useState(1);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${active}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, active]);
    const titleRef = useRef();
    const contentRef = useRef();

    const handleCreate = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;

        if (!title || !content) {
            alert("Please fill in all fields.");
            return;
        }

        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        .then((res) => {
            if (res.status === 200) {
                alert("Message created successfully!");
                loadMessages();
            }
        })
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        <Container fluid>
        <Row>
        {
            /* TODO: Allow an authenticated user to create a post. */
            loginStatus ? 
            <Col sm={12} md={6} lg={4}>
                <p>Post Title</p>
                <FormControl type='text' ref={titleRef}></FormControl>
                <p>Post Content</p>
                <FormControl type="text" ref={contentRef}></FormControl> 
                <Button onClick={() => handleCreate()}>Create Post</Button>
            </Col> :
            null
        }
        <Col sm={12} md={6} lg={8}><Container fluid>{
            messages.length > 0 ?  
                /* TODO: Complete displaying of messages. */
                <Row>
                {messages.map((message) => {
                     return <Col sm={12} md={6} lg={4} key={message.id}><BadgerMessage {...message} reload={loadMessages}></BadgerMessage></Col>
                })} </Row>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }</Container>
        <Pagination>
            <Pagination.Item active={active === 1} onClick={() => setActive(1)}>{1}</Pagination.Item>
            <Pagination.Item active={active === 2} onClick={() => setActive(2)}>{2}</Pagination.Item>
            <Pagination.Item active={active === 3} onClick={() => setActive(3)}>{3}</Pagination.Item>
            <Pagination.Item active={active === 4} onClick={() => setActive(4)}>{4}</Pagination.Item>
        </Pagination>
        </Col>
        </Row>
        </Container>
        
    </>
}
