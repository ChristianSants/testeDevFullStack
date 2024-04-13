import React from "react";
import { Button, Card } from "react-bootstrap";

const MyCard = ({ title, textButton, methodOnClick }) => {
    return (
        <Card>
            <Card.Header as="h5" className="bg-primary text-white" >{title}</Card.Header>
            <Card.Body>
                <Button variant="primary" onClick={() => methodOnClick()}>{textButton}</Button>
            </Card.Body>
        </Card>
    );
}

export default MyCard;