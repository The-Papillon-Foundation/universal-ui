import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCreateSession } from "../hooks/useCreateSession";
import { customTheme } from "../hooks/useCachedResources";
import {
    FormControl,
    Heading,
    Input,
    ScrollView,
    Spacer,
    Spinner,
    Stack,
    Text,
    View,
    VStack,
    WarningOutlineIcon,
} from "native-base";
import Navbar from "../components/Navbar";
import QuestionContainer from "../components/QuestionContainer";
import { useLogin } from "../hooks/useLogin";
import { userCreationSchema } from "../validation/user-validation";
import QuestionPrompt from "../components/QuestionPrompt";
import QuestionButton from "../components/QuestionButton";
import { useIdUpload } from "../hooks/useIdUpload";
import { Camera, CameraType } from "expo-camera";
import { Image } from "react-native";
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
        documentUri,
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

    const skipDocumentUpload = handleUserInfoSubmit;

    return (
        <View
            flex={1}
            bgColor={{
                base: customTheme.colors.mobile_question_screen_background,
                md: customTheme.colors.large_question_screen_background,
            }}
            justifyContent="space-around"
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
                            p={{ base: "15px", md: "25px" }}
                            borderRadius={"10px"}
                            justifyContent="space-around"
                        >
                            {isLoading && <Spinner color="grey" size="large" />}

                            {!documentSelected && !cameraOpen && !photoInfo && (
                                <>
                                    <VStack>
                                        <QuestionPrompt>
                                            Upload your State ID
                                        </QuestionPrompt>
                                        <Text
                                            fontFamily={"sf-pro"}
                                            color={"#A3A3A3"}
                                            fontSize={"14px"}
                                        >
                                            Any photo ID that is issued by the
                                            state, such as driver's license or
                                            REAL ID. Your ID should be valid.
                                            This cannot be a library, school, or
                                            work ID.{" "}
                                        </Text>
                                    </VStack>
                                    <Stack
                                        direction={{
                                            base: "column",
                                            md: "row",
                                        }}
                                        space={"10px"}
                                    >
                                        <QuestionButton onPress={openCamera}>
                                            Take a picture
                                        </QuestionButton>
                                        <QuestionButton
                                            onPress={openDocumentPicker}
                                        >
                                            Select from library
                                        </QuestionButton>
                                        <QuestionButton
                                            inverted
                                            onPress={skipDocumentUpload}
                                        >
                                            I don't have this
                                        </QuestionButton>
                                    </Stack>
                                </>
                            )}
                            {(cameraOpen ||
                                (!isUploaded &&
                                    !isLoading &&
                                    photoInfo != null)) && (
                                <View flex={1}>
                                    <QuestionPrompt>
                                        Upload your State ID
                                    </QuestionPrompt>
                                    <View
                                        style={{
                                            flex: 1,
                                            aspectRatio: 1.68,
                                            marginBottom: 25,
                                        }}
                                    >
                                        {cameraOpen ? (
                                            <Camera
                                                style={{
                                                    transform: [
                                                        {
                                                            scaleX:
                                                                cameraRef
                                                                    .current
                                                                    ?.props
                                                                    .type ===
                                                                CameraType.front
                                                                    ? -1
                                                                    : 1,
                                                        },
                                                    ],
                                                }}
                                                ref={cameraRef}
                                            />
                                        ) : (
                                            <Image
                                                source={{ uri: photoInfo?.uri }}
                                                style={{
                                                    flex: 1,
                                                    resizeMode: "cover",
                                                }}
                                            />
                                        )}
                                    </View>
                                    <Stack
                                        direction={{
                                            base: "column",
                                            md: "row",
                                        }}
                                        space={"10px"}
                                    >
                                        {cameraOpen ? (
                                            <QuestionButton
                                                onPress={takePicture}
                                            >
                                                Capture
                                            </QuestionButton>
                                        ) : (
                                            <QuestionButton
                                                onPress={retakePicture}
                                            >
                                                Retake photo
                                            </QuestionButton>
                                        )}

                                        <QuestionButton
                                            inactive={cameraOpen}
                                            onPress={uploadDocument}
                                        >
                                            Submit
                                        </QuestionButton>
                                    </Stack>
                                </View>
                            )}
                            {!isUploaded &&
                                documentSelected &&
                                documentResult?.type == "success" && (
                                    <VStack space={"10px"}>
                                        <QuestionPrompt>
                                            Upload your State ID
                                        </QuestionPrompt>
                                        <View
                                            style={{
                                                width: "100%",
                                                height: undefined,
                                                aspectRatio: 1.68,
                                                alignSelf: "center",
                                                marginBottom: 25,
                                            }}
                                        >
                                            <Image
                                                source={{ uri: documentUri }}
                                                style={{
                                                    flex: 1,
                                                    resizeMode: "cover",
                                                }}
                                            />
                                        </View>
                                        <QuestionButton
                                            onPress={openDocumentPicker}
                                        >
                                            Choose another file
                                        </QuestionButton>
                                        <QuestionButton
                                            onPress={uploadDocument}
                                        >
                                            Upload document
                                        </QuestionButton>
                                    </VStack>
                                )}

                            {isUploaded && (
                                <View flex={1} justifyContent={"center"}>
                                    <View my={"10px"}>
                                        <Heading
                                            fontFamily={"sf-pro-medium"}
                                            fontSize="14px"
                                            letterSpacing={"2px"}
                                        >
                                            Below is what we gathered based on
                                            the files you uploaded. Take a look
                                            to make sure they are correct. Tap
                                            to edit them.
                                        </Heading>
                                    </View>
                                    <ScrollView
                                        // maxH={"50%"}
                                        flexGrow={1}
                                        backgroundColor={"trueGray.50"}
                                    >
                                        <View>
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
                                                onChangeText={userInfo.setCity}
                                                placeholder={""}
                                                label="City"
                                            />
                                            <CustomTextInput
                                                value={userInfo.zip}
                                                onChangeText={userInfo.setZip}
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
                                    <View mt={"10px"}>
                                        <Text
                                            color={"trueGray.500"}
                                            textAlign="center"
                                        >
                                            Scroll down to view more
                                        </Text>
                                    </View>
                                    <View mt={"15px"}>
                                        <QuestionButton
                                            onPress={handleUserInfoSubmit}
                                        >
                                            I confirm all fields are correct
                                        </QuestionButton>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                </QuestionContainer>
            </View>
        </View>
    );
};

export default CreateUserScreen;
