import React from "react";
import Menu from "../components/General/Menu";
import { Container } from "react-bootstrap";
import PrivateRoute from "../helpers/PrivateRoute";
import List from "../components/User/List";

const Home = () => {
    return (
        <div>
            <Menu />
            <Container className="mt-4">
                <List></List>
            </Container>
        </div>
    );
};

export default PrivateRoute(Home);
