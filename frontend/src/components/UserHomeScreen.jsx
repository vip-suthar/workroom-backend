import React, { useEffect, useState } from "react";
import { Col, Container, Row, Stack, Button, Form } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const testApi = "http://localhost:8000";

function UserHomeScreen() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['workroom']);
    const [users, setUsers] = useState([]);
    const [editState, seteditState] = useState(undefined);
    var newName = "";
    useEffect(() => {
        (async function () {
            try {
                if (cookies["user-token"] && typeof cookies["user-token"] != 'undefined') {
                    let response = await fetch(testApi + "/user", {
                        "method": "GET",
                        "headers": {
                            "Authorization": cookies["user-token"]
                        }
                    });
                    if (response) {
                        let respData = await response.json();
                        if (respData.success !== false) {
                            setUsers(respData);
                        }
                    }
                } else {
                    navigate("/sign-in");
                }

            } catch (error) {
                console.log(error);
            }

        })()
    }, []);

    const handleEditState = async (id)=>{
        if (editState && editState === id) {
            try {
                if (cookies["user-token"] && typeof cookies["user-token"] != 'undefined') {
                    let response = await fetch(testApi + "/user/" + id, {
                        "method": "PATCH",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": cookies["user-token"]
                        },
                        "body": JSON.stringify({
                            "name": newName
                        })
                    });
                    if (response) {
                        let respData = await response.json();
                        if (respData.success !== false) {
                            // setUsers(respData);
                        }
                    }
                } else {
                    navigate("/sign-in");
                }
                seteditState(undefined);
            } catch (error) {
                console.log(error);
            }
        } else{
            seteditState(id);

        }
    }

    const handleDeleteState = async (id)=>{
        if (cookies["user-token"] && typeof cookies["user-token"] != 'undefined') {
            let response = await fetch(testApi + "/user/" + id, {
                "method": "DELETE",
                "headers": {
                    "Authorization": cookies["user-token"]
                }
            });
            if (response) {
                let respData = await response.json();
                if (respData.success !== false) {
                    // setUsers(respData);
                }
            }
        } else {
            navigate("/sign-in");
        }
    }

    const handleNameChange = async (id, e)=>{
        newName += newName === "" ? e.target.value : e.nativeEvent.data;
        console.log(e.target.value);
        if (cookies["user-token"] && typeof cookies["user-token"] != 'undefined') {
            let response = await fetch(testApi + "/user/" + id, {
                "method": "PATCH",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": cookies["user-token"]
                },
                "body": JSON.stringify({
                    "name": newName
                })
            });
            if (response) {
                let respData = await response.json();
                if (respData.success !== false) {
                    // setUsers(respData);
                }
            }
        } else {
            navigate("/sign-in");
        }
    }

    return (<>
        <Stack gap={3} className="mt-4">
            <Container>
            <Row>
                    <Col>ID</Col>
                    <Col>Name</Col>
                    <Col>Email</Col>
                    <Col>Actions</Col>
                </Row>
                {users.map(user=>{
                return <Row key={user._id}>
                    <Col>{user._id}</Col>
                    <Col><Form.Control type="text" placeholder="Name" value={user.name} onChange={handleNameChange.bind(this, user._id)} disabled={editState && (editState === user._id) ? false: true}/></Col>
                    <Col>{user.email}</Col>
                    <Col>
                    <Button variant="outline-primary" className="mr-2" onClick={handleEditState.bind(this, user._id)}><i className={editState && (editState === user._id) ? "fa fa-floppy-o" : "fa fa-pencil-square-o"}></i></Button>
                    <Button variant="outline-danger" onClick={handleDeleteState.bind(this, user._id)}><i className="fa fa-trash-o"></i></Button>
                    </Col>
                </Row>
            })}  
            </Container>
             
        </Stack>
    </>)
}

export default UserHomeScreen;