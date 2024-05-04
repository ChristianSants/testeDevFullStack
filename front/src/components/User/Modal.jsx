import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import MyModal from "../General/MyModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { pt } from 'yup-locale-pt';

yup.setLocale(pt);

const schema = (isUpdate) => yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.string().required(),
    password: !isUpdate
        ? yup.string().required()
        : yup.string(), // Se for atualização, não faz validação
});

const UserModal = ({ show, onClose, onSave, user, isUpdate }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema(isUpdate))
    });

    useEffect(() => {
        reset();

        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("role", user.roles[0].name);
        }
    }, [show, user, setValue, reset]);

    const handleSave = (data) => {
        if (isUpdate)
            onSave(data.name, data.role);
        else
            onSave(data.name, data.email, data.password, data.role);
    };

    const modalContent = (
        <Form>
            <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    {...register("name")}
                    className={errors.name ? "is-invalid" : ""}
                />
                {errors.name && <p className="text-danger">{errors.name?.message}</p>}
            </Form.Group>

            {!isUpdate && (
                <>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            {...register("email", { required: "Campo Obrigatório" })}
                            className={errors.email ? "is-invalid" : ""}
                        />
                        {errors.email && <p className="text-danger">{errors.email?.message}</p>}
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            {...register("password")}
                            className={errors.password ? "is-invalid" : ""}
                        />
                        {errors.password && <p className="text-danger">{errors.password?.message}</p>}
                    </Form.Group>
                </>
            )}

            <Form.Group controlId="formRole" className="mb-3">
                <Form.Label>Permissão</Form.Label>
                <Form.Control
                    as="select"
                    {...register("role")}
                    className={errors.role ? "is-invalid" : ""}
                >
                    <option value="Leitor">Leitor</option>
                    <option value="Moderador">Moderador</option>
                    <option value="Administrador">Administrador</option>
                </Form.Control>
                {errors.role && <p className="text-danger">{errors.role?.message}</p>}
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
            onClick: handleSubmit(handleSave),
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
