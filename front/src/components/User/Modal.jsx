import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import MyModal from "../General/MyModal";

const UserModal = ({ show, onClose, onSave, user, isUpdate }) => {
    const [name, setName] = useState(user ? user.name : "");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user ? user.email : "");
    const [role, setRole] = useState(user ? user.roles[0].name : "Leitor");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.roles[0].name);
        }
    }, [user]);

    const handleSave = () => {
        if(isUpdate)
            onSave(name, role) 
        else
            onSave(name, email, password, role);
    };

    const modalContent = (
        <Form>
            <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            {!isUpdate && (
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
            )}

            {!isUpdate && (
                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            )}

            <Form.Group controlId="formRole" className="mb-3">
                <Form.Label>Permissão</Form.Label>
                <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="Leitor">Leitor</option>
                    <option value="Moderador">Moderador</option>
                    <option value="Administrador">Administrador</option>
                </Form.Control>
            </Form.Group>

        </Form>
    );

    const modalButtons = [
        {
            label: "Fechar",
            variant: "secondary",
            onClick: onClose,
        },
        {
            label: isUpdate ? "Atualizar" : "Criar",
            variant: "primary",
            onClick: handleSave,
        },
    ];

    return (
        <MyModal
            show={show}
            onHide={onClose}
            title={isUpdate ? "Atualizar Usuário" : "Novo Usuário"}
            content={modalContent}
            buttons={modalButtons}
        />
    );
};

export default UserModal;
