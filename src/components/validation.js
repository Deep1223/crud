import validator from "validator";

const Validation = (data) => {
    let error = {}

    if(!data.name) {
        error.name = "Name is Required";
    }

    if(!data.number) {
        error.number = "Number is Required";
    }

    if(!data.email) {
        error.email = "Email is Required";
    }

    return error;
}

export default Validation;