import Api from "./Api";

const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return { headers };
}

const create = (email, name, password, role) => {
    return Api.post(`/user`, { email, name, password, role }, getAuthConfig());
}

const list = () => {
    return Api.get(`/user`, getAuthConfig());
}

const update = (id, name, role) => {
    return Api.patch(`/user/${id}`, { name, role }, getAuthConfig());
}

const destroy = (id) => {
    return Api.delete(`/user/${id}`, getAuthConfig());
}

const find = (id) => {
    return Api.get(`/user/${id}`, getAuthConfig());
}

const me = () => {
    return Api.get(`/me`, getAuthConfig());
}

export default { create, list, update, destroy, find, me };
