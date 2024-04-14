import React from "react";
import { FormControl } from "react-bootstrap";

const InputLogin = ({ type, placeholder, value, set }) => {
    return (
        <FormControl
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => set(e.target.value)}
            required
        />
    );
}

export default InputLogin;