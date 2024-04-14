import Swal from "sweetalert2";

const sendMessage = (icon, title, timer = 5000) => {
    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: timer
    }).fire({
        icon: icon,
        title: title
    })
}

const sendErrorMessage = (error) => {
    error = error.response
    let errorMessages = [];

    if (error.data && error.data.errors) {
        const errors = error.data.errors;
        Object.values(errors).forEach(errorArray => {
            errorArray.forEach(errorMessage => {
                errorMessages.push(errorMessage);
            });
        });
    }

    if (error.data && error.data.message && errorMessages.length === 0) {
        errorMessages.push(error.data.message);
    }

    if (errorMessages.length === 0) {
        errorMessages.push('Algum erro ocorreu!');
    }

    sendMessage('error', errorMessages.join('\n'));
}

const userAuthenticated = () => {
    if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
    }

    return null;
}

export default {sendMessage, userAuthenticated, sendErrorMessage};