import React, { useEffect, useState } from "react";
import LoadingOverlay from "../General/LoadingOverlay";
import UserService from "../../services/UserService";
import { Card, Col, Row,  } from "react-bootstrap";
import MyCard from "../General/MyCard";
import ModalCreate from "./Modal/Create";
import Options from "./Options";
import Util from "../../helpers/Util";

const List = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = () => {
        setIsLoading(true)

        UserService.list()
            .then(response => {
                setUsers(response.data.users)
            })
            .catch(error => {
                Util.sendErrorMessage(error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <LoadingOverlay loading={isLoading} />

            <MyCard title={"Usuários"} textButton={"Cadastrar usuário"} methodOnClick={() => setShowCreateModal(true)} />

            {showCreateModal && (
                <ModalCreate show={showCreateModal} onClose={() => setShowCreateModal(false)} onSaved={fetchUsers} />
            )}

            <hr></hr>

            {
                users.map((user) => {
                    return (
                        <Row className="mb-3" key={user.id}>
                            <Col>
                                <Card className="d-flex">
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col md={1}>
                                                <Card.Img src="/images/utilizador.png" alt="Exemplo" width={10}/>
                                            </Col>
                                            <Col md={8}>
                                                <Card.Text>{user.email} ({user.roles[0].name})</Card.Text>
                                                <Card.Title>{user.name}</Card.Title>
                                            </Col>
                                            <Col className="text-end">
                                                <Options userOfList={user} fetchUsers={fetchUsers}/>
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