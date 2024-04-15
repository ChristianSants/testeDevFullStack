import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ModalUpdate from "./Modal/Update";
import Swal from "sweetalert2";
import Util from "../../helpers/Util";
import UserService from "../../services/UserService";
import LoadingOverlay from "../General/LoadingOverlay";

const Options = ({userOfList, fetchUsers}) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const userAuthenticated = Util.userAuthenticated();
    const isAdmin = userAuthenticated && userAuthenticated.roles && userAuthenticated.roles.some(role => role.name === 'Administrador');
    const isModerator = userAuthenticated && userAuthenticated.roles && userAuthenticated.roles.some(role => role.name === 'Moderador');
    const [isLoading, setIsLoading] = useState(false);

    function deleteUser(){
        Swal.fire({
            title: 'Tem certeza que você deseja excluir este usuário?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
          }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                
                UserService.destroy(userOfList.id)
                    .then(response => {
                        if (response.status == 200) {
                            Util.sendMessage('success', 'Excluído com sucesso!');
                            fetchUsers()
                        } else {
                            console.log(response);
                            Util.sendMessage('error', 'Algum erro ocorreu!');
                        }
                    }).catch(error => {
                        Util.sendErrorMessage(error);
                    }).finally(() => {
                        setIsLoading(false);
                    })
            }
          })
    }

    return (
        <>
            <LoadingOverlay loading={isLoading} />

            <DropdownButton id="dropdown-acoes" title="Ações">
                <Dropdown.Item onClick={() => setShowUpdateModal(true)} disabled={!isAdmin && !isModerator}>
                    Editar
                </Dropdown.Item>

                <Dropdown.Item onClick={() => deleteUser()} disabled={!isAdmin}>
                    Excluir
                </Dropdown.Item>
            </DropdownButton>

            {showUpdateModal && (
                <ModalUpdate
                    show={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    user={userOfList}
                    onUpdate={fetchUsers}
                />
            )}
        </>
    );
}

export default Options;