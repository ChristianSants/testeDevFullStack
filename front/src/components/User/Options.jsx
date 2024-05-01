import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Util from "../../helpers/Util";

const Options = ({ userOfList, handleDelete, handleShowModal }) => {
    const userAuthenticated = Util.userAuthenticated();
    const isAdmin = userAuthenticated && userAuthenticated.roles && userAuthenticated.roles.some(role => role.name === 'Administrador');
    const isModerator = userAuthenticated && userAuthenticated.roles && userAuthenticated.roles.some(role => role.name === 'Moderador');

    return (
        <>
            <DropdownButton id="dropdown-acoes" title="Ações">
                <Dropdown.Item onClick={() => handleShowModal(userOfList)} disabled={!isAdmin && !isModerator}>
                    Editar
                </Dropdown.Item>

                <Dropdown.Item onClick={() => handleDelete(userOfList)} disabled={!isAdmin}>
                    Excluir
                </Dropdown.Item>
            </DropdownButton>
        </>
    );
}

export default Options;