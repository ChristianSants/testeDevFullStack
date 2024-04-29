import React from "react";
import { Card, Col, Row, } from "react-bootstrap";
import Options from "./Options";

const List = ({ users, handleShowModal, handleDelete }) => {
    return (
        <>
            {
                users.map((user) => {
                    return (
                        <Row className="mb-3" key={user.id}>
                            <Col>
                                <Card className="d-flex">
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col md={1}>
                                                <Card.Img src="/images/utilizador.png" alt="Exemplo" width={10} />
                                            </Col>
                                            <Col md={8}>
                                                <Card.Text>{user.email} ({user.roles[0].name})</Card.Text>
                                                <Card.Title>{user.name}</Card.Title>
                                            </Col>
                                            <Col className="text-end">
                                                <Options
                                                    userOfList={user} 
                                                    handleDelete={handleDelete} 
                                                    handleShowModal={handleShowModal} 
                                                />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    );
                })
            }
        </>
    );
}

export default List;