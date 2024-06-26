import React from "react";
import { Spinner } from "react-bootstrap";
import { useLoading } from "../../contexts/Loading";

const LoadingOverlay = () => {
    const { isLoading } = useLoading();

    return (
        <div hidden={!isLoading} style={{
            position: "fixed",
            zIndex: 100000,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default LoadingOverlay;