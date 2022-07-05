import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";

import { Box, Button, Center, Heading, Spacer, View } from "native-base";
import { useDocumentUpload } from "../hooks/useDocumentUpload";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDocumentDownload } from "../hooks/useDocumentDownload";
import { useLogin } from "../hooks/useLogin";
import { GlobalContext } from "../contexts/GlobalContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen = ({ navigation }: Props) => {
    const {
        openDocumentPicker,
        isLoading,
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
    const { sessionId, checkedForSession } = useContext(GlobalContext);

    const review = () => {
        navigation.navigate("Review");
    };

    useEffect(() => {
        if (checkedForSession && sessionId == "") {
            navigation.navigate("Landing");
        }
    }, [checkedForSession, sessionId]);
    return (
        <View
            py={50}
            flex={1}
            justifyContent="space-around"
            alignItems={"center"}
        >
            <View>
                <Heading>Upload a document</Heading>
                {isLoading && <ActivityIndicator color="grey" size="large" />}

                {!documentSelected && (
                    <Button onPress={openDocumentPicker}>Pick document</Button>
                )}
                {documentSelected && documentResult?.type == "success" && (
                    <>
                        <Heading>{documentResult.name}</Heading>
                        <Spacer my={1} />
                        <Button onPress={uploadDocument}>
                            Upload document
                        </Button>
                    </>
                )}
            </View>
            <View>
                <Heading>Download your document</Heading>
                {documentLink == "" ? (
                    <Button onPress={prepareDownload}>
                        {isDownloadLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            "Prepare Download"
                        )}
                        {downloadProgress > 0 && (
                            <ProgressBar progress={downloadProgress} />
                        )}
                    </Button>
                ) : (
                    <Button onPress={downloadDocument} bgColor={"success.600"}>
                        Download pdf
                    </Button>
                )}
            </View>
            <View>
                <Heading>Review your answers</Heading>
                <Button onPress={review}>Review</Button>
            </View>
            <View>
                <Heading>Clear your session data</Heading>
                <Button onPress={logout}>Logout</Button>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
