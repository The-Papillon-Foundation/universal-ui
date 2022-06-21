import React, { useContext, useState } from "react";
import { Box, Button, Center, Heading, Input, Spacer, View } from "native-base";
import { WorkflowContext } from "../contexts/WorkflowContext";
import QuestionContainer from "./QuestionContainer";
import { GlobalContext } from "../contexts/GlobalContext";
import { useLogin } from "../hooks/useLogin";
import { ActivityIndicator } from "react-native-paper";

type Props = {};

const ForceLoginScreen = (props: Props) => {
    const { setIsLoggedIn } = useContext(WorkflowContext);
    const [value, setValue] = useState("");
    const { isLoading, login } = useLogin();

    const handleChange = (value: string) => {
        setValue(value);
    };

    const handleLogin = () => {
        login(value).then(() => setIsLoggedIn(true));
    };
    return (
        <View alignItems={"center"} w="100%">
            <View w={300}>
                <Heading textAlign={"center"}>
                    You must log in to continue the process
                </Heading>
                <Spacer my={2} />
                <Input
                    value={value}
                    onChangeText={handleChange}
                    placeholder="Enter Your Username"
                    onSubmitEditing={handleLogin}
                />
                <Spacer my={1} />
                <Button onPress={handleLogin}>
                    {isLoading ? <ActivityIndicator /> : "Login"}
                </Button>
            </View>
        </View>
    );
};

export default ForceLoginScreen;
