import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCreateSession } from "../hooks/useCreateSession";
import { customTheme } from "../hooks/useCachedResources";
import {
    Button,
    FormControl,
    Heading,
    Input,
    ScrollView,
    Spacer,
    Spinner,
    View,
    WarningOutlineIcon,
} from "native-base";
import Navbar from "../components/Navbar";
import QuestionContainer from "../components/QuestionContainer";
import { useLogin } from "../hooks/useLogin";
import { userCreationSchema } from "../validation/user-validation";
import QuestionPrompt from "../components/QuestionPrompt";
import QuestionButton from "../components/QuestionButton";
import { useIdUpload } from "../hooks/useIdUpload";
import { Camera } from "expo-camera";
import { Image } from "react-native";
import InsetShadow from "react-native-inset-shadow";
import CustomTextInput from "../components/CustomTextInput";
import CustomDatePicker from "../components/CustomDatePicker";

type Props = {
    route: RouteProp<RootStackParamList, "CreateUser">;
    navigation: StackNavigationProp<RootStackParamList, "CreateUser">;
};

const CreateUserScreen = ({ route, navigation }: Props) => {
    // creates a session and stores it in global context
    useCreateSession(route.params.stateName!);
    const [username, setUsername] = useState("");
    const { login } = useLogin();
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");

    const {
        documentSelected,
        isLoading,
        openDocumentPicker,
        documentResult,
        isUploaded,
        uploadDocument,
        userInfo,
        openCamera,
        cameraOpen,
        takePicture,
        retakePicture,
        cameraRef,
        photoInfo,
    } = useIdUpload();

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
                setIsLoggedIn(true);
            })
            .catch((err) => {
                setIsInvalid(true);
                setError(err.errors);
            });
    };

    const handleUserInfoSubmit = () => {
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
                    {!isLoggedIn ? (
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
                    ) : (
                        <View
                            backgroundColor={"white"}
                            flex={1}
                            p={{ base: "15px", md: "55px" }}
                            borderRadius={"10px"}
                            justifyContent="center"
                        >
                            {isLoading && <Spinner color="grey" size="large" />}

                            {!documentSelected && !cameraOpen && !photoInfo && (
                                <>
                                    <Heading textAlign={"center"} mb={15}>
                                        Upload an id
                                    </Heading>
                                    <Button
                                        onPress={openCamera}
                                        style={{ marginBottom: 10 }}
                                    >
                                        Take a picture
                                    </Button>
                                    <Button onPress={openDocumentPicker}>
                                        Select from library
                                    </Button>
                                </>
                            )}
                            {cameraOpen && (
                                <>
                                    <Camera
                                        style={{
                                            transform: [{ scaleX: -1 }],
                                            width: 400,
                                            height: 400,
                                            alignSelf: "center",
                                            marginBottom: 15,
                                        }}
                                        ref={cameraRef}
                                    />

                                    <Button onPress={takePicture}>
                                        Capture Image
                                    </Button>
                                </>
                            )}
                            {!isUploaded && !isLoading && photoInfo != null && (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Image
                                        source={{ uri: photoInfo.uri }}
                                        style={{
                                            width: undefined,
                                            height: "85%",
                                            aspectRatio: 1,
                                            alignSelf: "center",
                                            resizeMode: "contain",
                                        }}
                                    />

                                    <Button
                                        onPress={uploadDocument}
                                        style={{ marginBottom: 10 }}
                                    >
                                        Continue
                                    </Button>
                                    <Button
                                        backgroundColor={"red.500"}
                                        onPress={retakePicture}
                                    >
                                        Retake Photo
                                    </Button>
                                </View>
                            )}
                            {!isUploaded &&
                                documentSelected &&
                                documentResult?.type == "success" && (
                                    <>
                                        <Heading>{documentResult.name}</Heading>
                                        <Button onPress={uploadDocument}>
                                            Upload document
                                        </Button>
                                    </>
                                )}

                            {isUploaded && (
                                <>
                                    <Heading>Review your information</Heading>
                                    <InsetShadow>
                                        <ScrollView
                                            persistentScrollbar={true}
                                            style={{ flex: 1 }}
                                        >
                                            <View style={{ padding: 10 }}>
                                                <CustomTextInput
                                                    value={userInfo.firstName}
                                                    onChangeText={
                                                        userInfo.setFirstName
                                                    }
                                                    placeholder={""}
                                                    label="First Name"
                                                />

                                                <CustomTextInput
                                                    value={userInfo.middleName}
                                                    onChangeText={
                                                        userInfo.setMiddleName
                                                    }
                                                    placeholder={""}
                                                    label="Middle Name"
                                                />

                                                <CustomTextInput
                                                    value={userInfo.lastName}
                                                    onChangeText={
                                                        userInfo.setLastName
                                                    }
                                                    placeholder={""}
                                                    label="Last Name"
                                                />
                                                <CustomTextInput
                                                    value={userInfo.address}
                                                    onChangeText={
                                                        userInfo.setAddress
                                                    }
                                                    placeholder={""}
                                                    label="Address"
                                                />
                                                <CustomTextInput
                                                    value={userInfo.city}
                                                    onChangeText={
                                                        userInfo.setCity
                                                    }
                                                    placeholder={""}
                                                    label="City"
                                                />
                                                <CustomTextInput
                                                    value={userInfo.zip}
                                                    onChangeText={
                                                        userInfo.setZip
                                                    }
                                                    placeholder={""}
                                                    label="Zip code"
                                                />
                                                <CustomTextInput
                                                    value={userInfo.usState}
                                                    onChangeText={
                                                        userInfo.setUsState
                                                    }
                                                    placeholder={""}
                                                    label="State"
                                                />
                                                <CustomDatePicker
                                                    value={userInfo.dateOfBirth}
                                                    label={"Date of Birth"}
                                                    onChange={
                                                        userInfo.setDateOfBirth
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </InsetShadow>
                                    <View h={"45px"} mt={"10px"}>
                                        <QuestionButton
                                            onPress={handleUserInfoSubmit}
                                        >
                                            Submit
                                        </QuestionButton>
                                    </View>
                                </>
                            )}
                        </View>
                    )}
                </QuestionContainer>
            </View>
        </View>
    );
};

export default CreateUserScreen;
