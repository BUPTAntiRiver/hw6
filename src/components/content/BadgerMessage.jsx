import React from "react"
import { Button, Card } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    const currentName = sessionStorage.getItem("loginStatus");

    function handleDelete() {
        fetch(`https://cs571.org/rest/s25/hw6/messages?id=${props.id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            }
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Del successfully!')
                props.reload()
            } else {
                alert('Ops!')
            }
        }) 
    }

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            currentName === props.poster ? 
            <Button variant="danger" onClick={() => handleDelete()}>Delete Post</Button>
            : null
        }
    </Card>
}

export default BadgerMessage;