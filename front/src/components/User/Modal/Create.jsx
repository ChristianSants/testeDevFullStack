import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import UserService from "../../../services/UserService";
import LoadingOverlay from "../../General/LoadingOverlay";
import Util from "../../../helpers/Util";

const CreateModal = ({ show, onClose, onSaved }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Leitor");
    const [isLoading, setIsLoading] = useState(false);

    const save = () => {
        setIsLoading(true);

        UserService.create(email, name, password, role)
            .then(response => {
                if (response.status == 201) {
                    Util.sendMessage('success', 'Criado com sucesso!');
                    onClose()
                    onSaved()
                } else {
                    Util.sendMessage('error', 'Algum erro ocorreu!');
                }
            })
            .catch(error => {
                Util.sendErrorMessage(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <>
            <LoadingOverlay loading={isLoading} />

            <Modal backdrop="static" show={show} onHide={() => onClose()}>
                <Modal.Header className="bg-primary text-white" closeButton>
                    <Modal.Title as={"h5"}>Novo Usuário</Modal.Title>
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
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        autoFocus
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        autoFocus
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Permissão</Form.Label>
                                    <Form.Select onChange={(e) => setRole(e.target.value)} >
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
                        Criar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateModal;