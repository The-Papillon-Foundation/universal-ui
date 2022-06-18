import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Box, Button, Center, Heading, Spacer } from "native-base";
import { useDocumentUpload } from "../hooks/useDocumentUpload";
import { ActivityIndicator } from "react-native-paper";

type Props = {};

const HomeScreen = (props: Props) => {
    const {
        openDocumentPicker,
        isLoading,
        uploadDocument,
        documentSelected,
        documentResult,
    } = useDocumentUpload();
    return (
        <Center flex={1}>
            <Box height={"50%"}>
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
            </Box>
        </Center>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
