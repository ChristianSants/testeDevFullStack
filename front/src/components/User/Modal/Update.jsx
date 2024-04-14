import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import LoadingOverlay from "../../General/LoadingOverlay";
import UserService from "../../../services/UserService";
import Util from "../../../helpers/Util";

const UpdateModal = ({ show, onClose, user, onUpdate }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("Leitor");
    const [isLoading, setIsLoading] = useState(false);
    const userAuthenticated = Util.userAuthenticated();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setRole(user.roles[0].name);
        }
    }, [user]);

    const save = async () => {
        setIsLoading(true);

        UserService.update(user.id, name, role)
            .then(response => {
                Util.sendMessage('success', 'Atualizado com sucesso!');
                onUpdate();
                onClose();
            })
            .catch(error => {
                Util.sendErrorMessage(error)
            })
            .finally(() => {
                setIsLoading(false); 
            });
    };

    return (
        <>
            <LoadingOverlay loading={isLoading} />
            <Modal backdrop="static" show={show} onHide={() => onClose()}>
                <Modal.Header className="bg-primary text-white" closeButton>
                    <Modal.Title as={"h5"}>Atualizar Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Permissão</Form.Label>
                                    <Form.Select onChange={(e) => setRole(e.target.value)} value={role} disabled={userAuthenticated.id == user.id} >
                                        <option value={'Leitor'}>Leitor</option>
                                        <option value={'Moderador'}>Moderador</option>
                                        <option value={'Administrador'}>Administrador</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onClose()}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={save}>
                        Atualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateModal;