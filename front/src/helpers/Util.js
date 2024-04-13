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

const userAuthenticated = () => {
    if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
    }

    return null;
}

export default {sendMessage, userAuthenticated};