import React, { useContext } from "react";
import { Box, Button, Center, Heading, Spacer } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { QuestionStackParams } from "./QuestionScreen";
import { useNavigation } from "@react-navigation/native";
import { QuestionContext } from "../contexts/QuestionContext";

type Props = {};

const ForceLoginScreen = (props: Props) => {
    const navigation =
        useNavigation<
            StackNavigationProp<QuestionStackParams, "ForceLoginScreen">
        >();
    const { setIsLoggedIn } = useContext(QuestionContext);

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigation.navigate("WorkflowLoading");
    };
    return (
        <Center flex={1}>
            <Box>
                <Heading>You must log in to continue the process</Heading>
                <Spacer my={2} />
                <Button onPress={handleLogin}>Mock Login</Button>
            </Box>
        </Center>
    );
};

export default ForceLoginScreen;
