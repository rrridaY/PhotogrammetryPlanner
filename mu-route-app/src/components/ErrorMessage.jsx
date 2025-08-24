import React from "react";

const ErrorMessage = ({ error }) => {
    return <div>Error: {error.message}</div>;
};

export default ErrorMessage;