import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import LoadingOverlay from "../General/LoadingOverlay";
import MyCard from "../General/MyCard";
import List from "./List";
import Util from "../../helpers/Util";
import UserModal from "./Modal";
import Swal from "sweetalert2";

const User = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers()
    }, []);

    // listar
    const fetchUsers = () => {
        setIsLoading(true)

        UserService.list()
            .then(response => {
                setUsers(response.data.users)
            })
            .catch(error => {
                Util.sendErrorMessage(error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // modais update e create
    const handleShowModal = (user = null) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleUpdate = (name, role) => {
        handleRequestCreateUpdate(
            UserService.update(selectedUser.id, name, role),
            'Atualizado com sucesso!'
        );
    };

    const handleCreate = (name, email, password, role) => {
        handleRequestCreateUpdate(
            UserService.create(email, name, password, role),
            'Criado com sucesso!',
        );
    };

    const handleRequestCreateUpdate = (requestPromise, successMessage, errorMessage = 'Algum erro ocorreu!') => {
        setIsLoading(true);
    
        requestPromise
            .then(response => {
                setIsLoading(false);

                if (response.status === 200 || response.status === 201) {
                    Util.sendMessage('success', successMessage)
                    handleModalClose();
                    fetchUsers();
                } else {
                    Util.sendMessage('error', errorMessage)
                }
            })
            .catch(error => {
                setIsLoading(false);
                Util.sendErrorMessage(error);
            })
    };

    // delete
    const handleDelete = (user) => {
        Swal.fire({
            title: 'Tem certeza que você deseja excluir este usuário?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);

                UserService.destroy(user.id)
                    .then(response => {
                        setIsLoading(false);
                        
                        if (response.status === 200) {
                            Util.sendMessage('success', 'Excluído com sucesso!');
                            fetchUsers()
                        } else {
                            Util.sendMessage('error', 'Algum erro ocorreu!');
                        }
                    }).catch(error => {
                        setIsLoading(false);
                        Util.sendErrorMessage(error);
                    })
            }
        })
    }

    return (
        <>
            <LoadingOverlay loading={isLoading} />

            <MyCard
                title={"Usuários"}
                textButton={"Cadastrar usuário"}
                methodOnClick={handleShowModal}
            />

            <hr></hr>

            <List
                users={users}
                handleShowModal={handleShowModal}
                handleDelete={handleDelete}
            />

            <UserModal
                show={showModal}
                onClose={handleModalClose}
                onSave={selectedUser ? handleUpdate : handleCreate}
                user={selectedUser}
                isUpdate={!!selectedUser}
            />
        </>
    );
}

export default User;