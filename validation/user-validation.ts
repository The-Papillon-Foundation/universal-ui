import * as yup from "yup";

export const userCreationSchema = yup.object().shape({
    username: yup
        .string()
        .min(4, "Username must be at least 4 characters.")
        .matches(/^[a-zA-Z0-9]+$/, "No special characters or spaces allowed.")
        .required(),
});
