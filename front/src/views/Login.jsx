import React, { useEffect, useState } from "react";
import { Form, FormControl, Button, Row, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/Auth";
import LoadingOverlay from "../components/General/LoadingOverlay";
import Util from "../helpers/Util";
import InputLogin from "../components/Login/Input";

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
                    <Image src="/images/senac_logo.png" fluid className="col-md-6 mb-4" />
                    <h1 className="text-primary">Faça Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <InputLogin 
                            type="email"
                            placeholder="Email"
                            value={email}
                            set={setEmail}
                        />

                        <InputLogin
                            type="password"
                            placeholder="Senha"
                            value={password}
                            set={setPassword}
                        />

                        <div className="w-100 text-center">
                            <Button type="submit" className="rounded mt-3 text-center">Acessar agora</Button>
                        </div>
                    </Form>
                </Row>
            </Container>
        </div>
    );
};

export default Login;