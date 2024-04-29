import React from "react";
import { Button, Modal } from "react-bootstrap";

const MyModal = ({ show, onHide, title, content, buttons }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className="bg-primary text-white" closeButton>
                <Modal.Title as={"h5"}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
                {buttons.map((button, index) => (
                    <Button key={index} variant={button.variant} onClick={button.onClick}>
                        {button.label}
                    </Button>
                ))}
            </Modal.Footer>
        </Modal>
    );
};

export default MyModal;
