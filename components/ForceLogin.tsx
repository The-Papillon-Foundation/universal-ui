import React, { useContext, useState } from "react";
import {
    Button,
    FormControl,
    Heading,
    Input,
    Spacer,
    View,
    WarningOutlineIcon,
} from "native-base";
import { WorkflowContext } from "../contexts/WorkflowContext";
import { useLogin } from "../hooks/useLogin";
import * as yup from "yup";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { RouteProp } from "@react-navigation/native";

const userCreationSchema = yup.object().shape({
    username: yup
        .string()
        .min(4, "Username must be at least 4 characters.")
        .matches(/^[a-zA-Z0-9]+$/, "No special characters or spaces allowed.")
        .required(),
});

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "CreateUser">;
    route: RouteProp<RootStackParamList, "CreateUser">;
};

const ForceLoginScreen = ({ navigation, route }: Props) => {
    const [username, setUsername] = useState("");
    const { isLoading, login } = useLogin();
    const [isInvalid, setIsInvalid] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (value: string) => {
        setUsername(value);
    };

    const handleLogin = () => {
        setIsInvalid(false);
        setError("");
        userCreationSchema
            .validate({ username })
            .then(() => {
                login(username);
                navigation.navigate("Process", {
                    stateName: route.params.stateName,
                });
            })
            .catch((err) => {
                setIsInvalid(true);
                setError(err.errors);
            });
    };
    return (
        <View alignItems={"center"} w="100%">
            <View w={300}>
                <Heading textAlign={"center"}>
                    You must log in to continue the process
                </Heading>
                <Spacer my={2} />
                <FormControl isInvalid={isInvalid}>
                    <Input
                        value={username}
                        onChangeText={handleChange}
                        placeholder="Enter Your Username"
                        onSubmitEditing={handleLogin}
                        autoFocus
                        editable={!isLoading}
                    />
                    <FormControl.ErrorMessage
                        alignItems={"flex-start"}
                        leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                        {error}
                    </FormControl.ErrorMessage>
                </FormControl>
                <Spacer my={1} />
                <Button onPress={handleLogin} isLoading={isLoading}>
                    Login
                </Button>
            </View>
        </View>
    );
};

export default ForceLoginScreen;
