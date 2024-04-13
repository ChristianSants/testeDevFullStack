import Api from "./Api";

const logar = (email, password) => {
    return Api.post("/login", {
        email,
        password,
    });
}

const sair = (token) => {
    return Api.get("/logout", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export default {logar, sair};