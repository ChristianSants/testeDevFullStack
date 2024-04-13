import React, { useEffect, useState } from "react";
import { Form, FormControl, Button, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/Auth";
import LoadingOverlay from "../components/General/LoadingOverlay";
import Util from "../helpers/Util";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // verifica se existe token e manda p dashboard
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/");
        }
    }, []);

    // submit do form
    const handleSubmit = async (e) => {
        setIsLoading(true)

        e.preventDefault();

        try {
            localStorage.removeItem('token');
            localStorage.removeItem('expired_at');

            const response = await AuthService.logar(email, password);

            if (response.status == 200) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("expired_at", response.data.expired_at);

                navigate("/");
            } else {
                console.log(response);
            }

        } catch (error) {
            Util.sendMessage('error', error.response.data.error);
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <LoadingOverlay loading={isLoading} />
            <Container className="login d-flex align-items-center justify-content-center">
                <Row>
                    <h1 className="text-primary">Faça Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormControl
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <FormControl
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button type="submit">Logar</Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );
};

export default Login;