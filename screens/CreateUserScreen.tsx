import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCreateSession } from "../hooks/useCreateSession";
import { customTheme } from "../hooks/useCachedResources";
import {
    FormControl,
    Input,
    Spacer,
    View,
    WarningOutlineIcon,
} from "native-base";
import Navbar from "../components/Navbar";
import QuestionContainer from "../components/QuestionContainer";
import { useLogin } from "../hooks/useLogin";
import { userCreationSchema } from "../validation/user-validation";
import QuestionPrompt from "../components/QuestionPrompt";
import QuestionButton from "../components/QuestionButton";

type Props = {
    route: RouteProp<RootStackParamList, "CreateUser">;
    navigation: StackNavigationProp<RootStackParamList, "CreateUser">;
};

const CreateUserScreen = ({ route, navigation }: Props) => {
    // creates a session and stores it in global context
    useCreateSession(route.params.stateName!);
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
                    stateName: route.params!.stateName,
                    questionIndex: 0,
                    groupIndex: 0,
                });
            })
            .catch((err) => {
                setIsInvalid(true);
                setError(err.errors);
            });
    };

    const onFinish = () => {
        navigation.navigate("Process", {
            stateName: route.params.stateName,
            groupIndex: 0,
            questionIndex: 0,
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
                            <QuestionPrompt>Create Account</QuestionPrompt>
                            <Spacer my={2} />
                            <FormControl isInvalid={isInvalid}>
                                <Input
                                    value={username}
                                    variant="underlined"
                                    onChangeText={handleChange}
                                    placeholder="Enter A Username"
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
                                <FormControl.ErrorMessage
                                    alignItems={"flex-start"}
                                    leftIcon={<WarningOutlineIcon size="xs" />}
                                >
                                    {error}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <Spacer my={"15px"} />
                            <QuestionButton
                                onPress={handleLogin}
                                isLoading={isLoading}
                            >
                                Sign up
                            </QuestionButton>
                        </View>
                    </View>
                </QuestionContainer>
            </View>
        </View>
    );
};

export default CreateUserScreen;
