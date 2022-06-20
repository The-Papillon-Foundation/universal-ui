import React, { useContext } from "react";
import { Box, Button, Center, Heading, Spacer } from "native-base";
import { WorkflowContext } from "../contexts/WorkflowContext";

type Props = {};

const ForceLoginScreen = (props: Props) => {
    const { setIsLoggedIn } = useContext(WorkflowContext);

    const handleLogin = () => {
        setIsLoggedIn(true);
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
