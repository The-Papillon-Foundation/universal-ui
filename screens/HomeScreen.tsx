import { StyleSheet } from "react-native";
import React from "react";

import { Box, Button, Center, Heading, Spacer, View } from "native-base";
import { useDocumentUpload } from "../hooks/useDocumentUpload";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDocumentDownload } from "../hooks/useDocumentDownload";

type Props = {};

const HomeScreen = (props: Props) => {
    const {
        openDocumentPicker,
        isLoading,
        uploadDocument,
        documentSelected,
        documentResult,
    } = useDocumentUpload();
    const {
        isLoading: isDownloadLoading,
        downloadDocument,
        progress: downloadProgress,
    } = useDocumentDownload();
    return (
        <View py={50} flex={1} justifyContent="center" alignItems={"center"}>
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
            <View my={20} />
            <View>
                <Heading>Download your document</Heading>
                <Button onPress={downloadDocument}>
                    {isDownloadLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        "Download"
                    )}
                    {downloadProgress > 0 && (
                        <ProgressBar progress={downloadProgress} />
                    )}
                </Button>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
