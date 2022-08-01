import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { Image, Text, View } from "native-base";
import { useDocumentUpload } from "../hooks/useDocumentUpload";
import { ActivityIndicator } from "react-native-paper";
import { useDocumentDownload } from "../hooks/useDocumentDownload";
import { useLogin } from "../hooks/useLogin";
import { GlobalContext } from "../contexts/GlobalContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { customAssets, customTheme } from "../hooks/useCachedResources";

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen = ({ navigation }: Props) => {
    const {
        openDocumentPicker,
        isLoading,
        isUploaded,
        uploadDocument,
        documentSelected,
        documentResult,
    } = useDocumentUpload();
    const {
        isLoading: isDownloadLoading,
        prepareDownload,
        progress: downloadProgress,
        downloadDocument,
        documentLink,
    } = useDocumentDownload();
    const { logout } = useLogin();
    const { sessionId, userId, checkedForSession } = useContext(GlobalContext);

    const review = () => {
        navigation.navigate("Review");
    };

    useEffect(() => {
        if (checkedForSession && sessionId == "") {
            navigation.navigate("Landing");
        }
    }, [checkedForSession, sessionId]);

    if (checkedForSession == false) {
        return <ActivityIndicator color="gray" size="large" />;
    }

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 50,
                    paddingVertical: 20,
                }}
                backgroundColor={
                    customTheme.colors.home_screen_navbar_background
                }
                borderBottomRadius={"40px"}
            >
                <View flexDirection={"row"} alignItems="center">
                    <Text
                        color={customTheme.colors.home_screen_navbar_title}
                        fontFamily={"sf-pro-bold"}
                        fontSize="2xl"
                    >
                        Hello, {userId}.
                    </Text>
                    <Text
                        ml="20px"
                        fontFamily={"sf-pro-medium"}
                        fontSize={"lg"}
                        color={customTheme.colors.home_screen_navbar_item}
                        onPress={logout}
                        textDecorationLine="underline"
                    >
                        Logout
                    </Text>
                </View>
                <View>
                    <Image
                        source={{ uri: customAssets.image_urls.logo as string }}
                        width={{ base: 50, md: 75 }}
                        height={undefined}
                        style={{ aspectRatio: 1 }}
                        alt={"Company logo"}
                    />
                </View>
            </View>
        </View>
    );

    // return (
    //     <View
    //         py={50}
    //         flex={1}
    //         justifyContent="space-around"
    //         alignItems={"center"}
    //     >
    //         <View>
    //             <Heading>Upload a document</Heading>
    //             {isLoading && <ActivityIndicator color="grey" size="large" />}

    //             {!documentSelected && (
    //                 <Button onPress={openDocumentPicker}>Pick document</Button>
    //             )}
    //             {documentSelected && documentResult?.type == "success" && (
    //                 <>
    //                     <Heading>{documentResult.name}</Heading>
    //                     <Spacer my={1} />
    //                     {!isUploaded && (
    //                         <Button onPress={uploadDocument}>
    //                             Upload document
    //                         </Button>
    //                     )}
    //                     {isUploaded && (
    //                         <Text color="success.500" textAlign={"center"}>
    //                             Your document has been successfully uploaded.
    //                         </Text>
    //                     )}
    //                 </>
    //             )}
    //         </View>
    //         <View>
    //             <Heading>Download your document</Heading>
    //             {documentLink == "" ? (
    //                 <Button onPress={prepareDownload}>
    //                     {isDownloadLoading ? (
    //                         <ActivityIndicator color="white" />
    //                     ) : (
    //                         "Prepare Download"
    //                     )}
    //                     {downloadProgress > 0 && (
    //                         <ProgressBar progress={downloadProgress} />
    //                     )}
    //                 </Button>
    //             ) : (
    //                 <Button onPress={downloadDocument} bgColor={"success.600"}>
    //                     Download pdf
    //                 </Button>
    //             )}
    //         </View>
    //         <View>
    //             <Heading>Review your answers</Heading>
    //             <Button onPress={review}>Review</Button>
    //         </View>
    //         <View>
    //             <Heading>Clear your session data</Heading>
    //             <Button onPress={logout}>Logout</Button>
    //         </View>
    //     </View>
    // );
};

export default HomeScreen;

const styles = StyleSheet.create({});
