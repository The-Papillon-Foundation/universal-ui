import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { customTheme } from "../hooks/useCachedResources";
import {
    FormControl,
    Input,
    Spacer,
    Stack,
    View,
    WarningOutlineIcon,
} from "native-base";
import Navbar from "../components/Navbar";
import QuestionContainer from "../components/QuestionContainer";
import { useLogin } from "../hooks/useLogin";
import QuestionPrompt from "../components/QuestionPrompt";
import QuestionButton from "../components/QuestionButton";
import { userCreationSchema } from "../validation/user-validation";

type Props = {
    route: RouteProp<RootStackParamList, "Login">;
    navigation: StackNavigationProp<RootStackParamList, "Login">;
};

const LoginScreen = ({ route, navigation }: Props) => {
    const [username, setUsername] = useState("");
    const { isLoading, login, error } = useLogin(navigation);
    const [validationError, setValidationError] = useState("");

    const handleChange = (value: string) => {
        setUsername(value);
    };

    const handleLogin = () => {
        setValidationError("");
        userCreationSchema
            .validate({ username })
            .then(() => {
                login(username);
            })
            .catch((err) => {
                setValidationError(err.errors);
            });
    };
    return (
        <View
            flex={1}
            bgColor={{
                base: customTheme.colors.mobile_question_screen_background,
                md: customTheme.colors.large_question_screen_background,
            }}
        >
            <Navbar />
            <View flex={1} justifyContent="center" alignItems="center">
                <QuestionContainer>
                    <View>
                        <View>
                            <QuestionPrompt>Log in</QuestionPrompt>
                            <Spacer my={2} />
                            <FormControl
                                isInvalid={
                                    typeof error == "string" ||
                                    validationError !== ""
                                }
                            >
                                <FormControl.ErrorMessage
                                    alignItems={"flex-start"}
                                    leftIcon={<WarningOutlineIcon size="xs" />}
                                >
                                    {typeof error == "string"
                                        ? error
                                        : validationError}
                                </FormControl.ErrorMessage>
                                <Input
                                    value={username}
                                    variant="underlined"
                                    onChangeText={handleChange}
                                    placeholder="Enter Your Username"
                                    fontFamily={"sf-pro"}
                                    fontSize={{ base: "md", md: "lg" }}
                                    placeholderTextColor={
                                        customTheme.colors
                                            .placeholder_question_text
                                    }
                                    onSubmitEditing={handleLogin}
                                    autoFocus
                                    editable={!isLoading}
                                    w={{ base: "100%", md: "55%" }}
                                />
                            </FormControl>
                            <Stack
                                direction={"column"}
                                w={"100%"}
                                justifyContent={"space-between"}
                                space={"8px"}
                                mt="15px"
                            >
                                <QuestionButton
                                    onPress={handleLogin}
                                    isLoading={isLoading}
                                >
                                    Log in
                                </QuestionButton>
                                <QuestionButton
                                    inverted
                                    onPress={() =>
                                        navigation.navigate("DetermineWorkflow")
                                    }
                                >
                                    Create an account
                                </QuestionButton>
                            </Stack>
                        </View>
                    </View>
                </QuestionContainer>
            </View>
        </View>
    );
};

export default LoginScreen;
