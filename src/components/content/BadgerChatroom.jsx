import React, { useContext, useEffect, useState } from "react"
import BadgerMessage from "./BadgerMessage";
import { Col, FormControl, Pagination, Row, Button, Container } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";


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

    return <>
        <h1>{props.name} Chatroom</h1>
        <Container fluid>
        <Row>
        {
            /* TODO: Allow an authenticated user to create a post. */
            loginStatus ? 
            <Col sm={12} md={6} lg={4}>
                <p>Post Title</p>
                <FormControl type='text'></FormControl>
                <p>Post Content</p>
                <FormControl type="text"></FormControl> 
                <Button>Create Post</Button>
            </Col> :
            null
        }
        <Col sm={12} md={6} lg={8}><Container fluid>{
            messages.length > 0 ?  
                /* TODO: Complete displaying of messages. */
                <Row>
                {messages.map((message) => {
                     return <Col sm={12} md={6} lg={4} key={message.id}><BadgerMessage {...message}></BadgerMessage></Col>
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
