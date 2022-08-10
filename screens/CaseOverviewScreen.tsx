import React, { useState } from "react";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import HomeNavBar from "../components/HomeNavBar";
import { findStateNameByAbbrev } from "./HomeScreen";
import {
    Button,
    CheckCircleIcon,
    Heading,
    Modal,
    ScrollView,
    Spacer,
    Stack,
    Text,
    useBreakpointValue,
    View,
} from "native-base";
import { customTheme } from "../hooks/useCachedResources";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import CaseCard from "../components/CaseCard";
import useGetCase from "../hooks/useGetCase";
import { useDocumentUpload } from "../hooks/useDocumentUpload";
import { useDocumentDownload } from "../hooks/useDocumentDownload";
import { ProgressBar } from "react-native-paper";

type Props = StackScreenProps<RootStackParamList, "Case">;

const DocumentManagementButton = ({
    onPress,
    iconName,
    instructionText,
    screenSize,
}: {
    onPress: () => void;
    iconName: string;
    instructionText: string;
    screenSize: string;
}) => (
    <View>
        <TouchableOpacity onPress={onPress}>
            <View
                w={{ base: "100%", md: "195px" }}
                h={{ base: undefined, md: "160px" }}
                borderRadius={"40px"}
                borderWidth="8px"
                borderColor={"blueGray.300"}
                backgroundColor="blueGray.100"
                justifyContent={"center"}
                alignItems="center"
                shadow={"5"}
                style={{
                    shadowOffset: { width: 0, height: 2 },
                    shadowColor: "#3D4A58",
                    shadowOpacity: 0.2,
                }}
            >
                <MaterialCommunityIcons
                    name={iconName as any}
                    size={screenSize == "base" ? 50 : 80}
                    color={customTheme.colors.blueGray[400]}
                />
            </View>
        </TouchableOpacity>
        <View>
            <Text
                fontFamily="sf-pro-bold"
                fontSize={{ base: "sm", md: "lg" }}
                color="darkBlue.800"
                textAlign="center"
                mt={"20px"}
            >
                {instructionText}
            </Text>
        </View>
    </View>
);

const CaseOverviewScreen = ({ navigation, route }: Props) => {
    const { isLoading, error, currentCase } = useGetCase(
        route.params.sessionId
    );
    const {
        openDocumentPicker,
        isLoading: isDocumentUploading,
        isUploaded,
        uploadDocument,
        documentSelected,
        documentResult,
        clearUpload,
    } = useDocumentUpload();
    const {
        isLoading: isDownloadLoading,
        prepareDownload,
        progress: downloadProgress,
        downloadDocument,
        documentLink,
        clearDownload,
    } = useDocumentDownload(route.params.sessionId);

    const screenSize = useBreakpointValue({
        base: "base",
        md: "md",
    });
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [openDownloadModal, setOpenDownloadModal] = useState(false);

    return (
        <View
            flex={1}
            backgroundColor={{
                base: customTheme.colors.light[100],
                md: "#FFF",
            }}
        >
            <HomeNavBar />
            <ScrollView>
                <View
                    mt={{ base: "25px", md: "42px" }}
                    mx={{ base: "15px", md: "50px" }}
                >
                    <Text
                        textDecorationLine={"underline"}
                        fontFamily="sf-pro-medium"
                        fontSize="lg"
                        color="trueGray.600"
                        onPress={() => navigation.pop()}
                    >
                        Back to My Cases
                    </Text>
                    {isLoading && (
                        <ActivityIndicator
                            style={{ alignSelf: "center", marginTop: "25%" }}
                        />
                    )}
                    {currentCase && (
                        <>
                            <View>
                                <Text
                                    fontFamily={"poppins-bold"}
                                    fontSize="2xl"
                                    color={customTheme.colors.case_card_title}
                                >
                                    {findStateNameByAbbrev(
                                        currentCase.workflowId
                                    )}
                                </Text>
                                <Text
                                    fontSize={"md"}
                                    fontFamily="sf-pro-bold"
                                    color={
                                        customTheme.colors.case_card_case_number
                                    }
                                >
                                    Case {currentCase.caseNumber}
                                </Text>
                            </View>
                            <View>
                                <Text fontFamily={"sf-pro-medium"}>
                                    Document Management
                                </Text>
                                <Stack
                                    direction={"row"}
                                    justifyContent="space-around"
                                    mx={{ base: "25px", md: "50px" }}
                                    mt="25px"
                                >
                                    <DocumentManagementButton
                                        onPress={() => {
                                            setOpenUploadModal(true);
                                        }}
                                        iconName="upload-outline"
                                        instructionText="Upload files"
                                        screenSize={screenSize}
                                    />
                                    <DocumentManagementButton
                                        onPress={() => {}}
                                        iconName="file-document-outline"
                                        instructionText="Review your form"
                                        screenSize={screenSize}
                                    />
                                    <DocumentManagementButton
                                        onPress={() => {
                                            setOpenDownloadModal(true);
                                        }}
                                        iconName="download-outline"
                                        instructionText="Download file"
                                        screenSize={screenSize}
                                    />
                                </Stack>
                            </View>
                            <View>
                                <Text
                                    my={{ base: "15px" }}
                                    fontFamily={"sf-pro-medium"}
                                >
                                    Question Groups
                                </Text>
                                <Stack
                                    justifyContent={{ md: "center" }}
                                    flex={1}
                                    direction={{ base: "column", md: "row" }}
                                    flexWrap={{ md: "wrap" }}
                                    backgroundColor={{
                                        base: undefined,
                                        md: customTheme.colors.light[100],
                                    }}
                                    borderRadius="24px"
                                >
                                    {currentCase.sessionState.cardGroups
                                        .filter(
                                            (cg) =>
                                                cg.module !=
                                                "eligibility_module"
                                        )
                                        .map((cg, index, cgs) => (
                                            <View
                                                key={index}
                                                w={{
                                                    base: "100%",
                                                    md: "375px",
                                                }}
                                                alignItems={{
                                                    md:
                                                        index == 0
                                                            ? "flex-start"
                                                            : cgs.length - 1 ==
                                                              index
                                                            ? "flex-end"
                                                            : "center",
                                                }}
                                                flexDirection={{
                                                    base: "row",
                                                    md: "column",
                                                }}
                                            >
                                                <View
                                                    my={{ base: 0, md: "24px" }}
                                                    pr={{
                                                        base: "10px",
                                                        md: undefined,
                                                    }}
                                                    w={{
                                                        base: undefined,
                                                        md: "100%",
                                                    }}
                                                    h={{
                                                        base: "100%",
                                                        md: undefined,
                                                    }}
                                                    flexDirection={{
                                                        base: "column",
                                                        md: "row",
                                                    }}
                                                    alignItems="center"
                                                >
                                                    <View
                                                        flex={1}
                                                        height={{
                                                            base: undefined,
                                                            md: "1px",
                                                        }}
                                                        width={{
                                                            base: "1px",
                                                            md: undefined,
                                                        }}
                                                        borderLeftWidth={{
                                                            base: "3px",
                                                            md: undefined,
                                                        }}
                                                        borderTopWidth={{
                                                            base: undefined,
                                                            md: "3px",
                                                        }}
                                                        borderLeftRadius={
                                                            index == 0
                                                                ? "30px"
                                                                : undefined
                                                        }
                                                        borderColor={
                                                            index == 0 &&
                                                            cg.completion ==
                                                                "1.0"
                                                                ? customTheme
                                                                      .colors
                                                                      .case_horizontal_divider
                                                                : index != 0 &&
                                                                  cgs[index - 1]
                                                                      .completion ==
                                                                      "1.0"
                                                                ? customTheme
                                                                      .colors
                                                                      .case_horizontal_divider
                                                                : "#C5E7EF"
                                                        }
                                                    />
                                                    <View
                                                        height={"20px"}
                                                        width={"20px"}
                                                        borderRadius={"30px"}
                                                        borderWidth={
                                                            cg.completion ==
                                                            "1.0"
                                                                ? undefined
                                                                : "3px"
                                                        }
                                                        borderColor={
                                                            cg.completion ==
                                                                "1.0" ||
                                                            (index != 0 &&
                                                                cgs[index - 1]
                                                                    .completion ==
                                                                    "1.0")
                                                                ? customTheme
                                                                      .colors
                                                                      .case_horizontal_divider
                                                                : "#C5E7EF"
                                                        }
                                                        alignItems="center"
                                                    >
                                                        {cg.completion ==
                                                            "1.0" && (
                                                            <CheckCircleIcon
                                                                size="35px"
                                                                color={
                                                                    customTheme
                                                                        .colors
                                                                        .case_horizontal_divider
                                                                }
                                                            />
                                                        )}
                                                    </View>
                                                    <View
                                                        flex={1}
                                                        height={{
                                                            base: undefined,
                                                            md: "1px",
                                                        }}
                                                        width={{
                                                            base: "1px",
                                                            md: undefined,
                                                        }}
                                                        borderLeftWidth={{
                                                            base: "3px",
                                                            md: undefined,
                                                        }}
                                                        borderTopWidth={{
                                                            base: undefined,
                                                            md: "3px",
                                                        }}
                                                        borderRightRadius={
                                                            cgs.length - 1 ==
                                                            index
                                                                ? "30px"
                                                                : undefined
                                                        }
                                                        borderColor={
                                                            cg.completion ==
                                                            "1.0"
                                                                ? customTheme
                                                                      .colors
                                                                      .case_horizontal_divider
                                                                : "#C5E7EF"
                                                        }
                                                    />
                                                </View>

                                                <CaseCard
                                                    onPress={() => {}}
                                                    completion={cg.completion}
                                                    title={cg.name}
                                                >
                                                    <Text
                                                        fontFamily={
                                                            "sf-pro-medium"
                                                        }
                                                        fontSize="sm"
                                                        color="trueGray.400"
                                                    >
                                                        {cg.description}
                                                    </Text>
                                                    <View mt="12px">
                                                        <Button
                                                            onPress={() => {
                                                                navigation.push(
                                                                    "Process",
                                                                    {
                                                                        stateName:
                                                                            currentCase.workflowId,
                                                                        questionIndex:
                                                                            Math.max(
                                                                                cg.questions.findIndex(
                                                                                    (
                                                                                        question
                                                                                    ) =>
                                                                                        question
                                                                                            .answers
                                                                                            .user ==
                                                                                        null
                                                                                ) -
                                                                                    1,
                                                                                0
                                                                            ),
                                                                        groupIndex:
                                                                            index,
                                                                    }
                                                                );
                                                            }}
                                                            w="50%"
                                                            bgColor={
                                                                Number(
                                                                    cg.completion
                                                                ) == 1
                                                                    ? "teal.500"
                                                                    : Number(
                                                                          cg.completion
                                                                      ) > 0
                                                                    ? "cyan.800"
                                                                    : "cyan.600"
                                                            }
                                                        >
                                                            {Number(
                                                                cg.completion
                                                            ) == 1
                                                                ? "Review"
                                                                : Number(
                                                                      cg.completion
                                                                  ) > 0
                                                                ? "Continue"
                                                                : "Start"}
                                                        </Button>
                                                    </View>
                                                </CaseCard>
                                            </View>
                                        ))}
                                </Stack>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
            <Modal
                isOpen={openUploadModal}
                onClose={() => {
                    setOpenUploadModal(false);
                    clearUpload();
                }}
            >
                <View
                    backgroundColor={"white"}
                    p={"55px"}
                    borderRadius={"10px"}
                >
                    <Heading>Upload a document</Heading>
                    {isLoading && (
                        <ActivityIndicator color="grey" size="large" />
                    )}

                    {!documentSelected && (
                        <Button onPress={openDocumentPicker}>
                            Pick document
                        </Button>
                    )}
                    {documentSelected && documentResult?.type == "success" && (
                        <>
                            <Heading>{documentResult.name}</Heading>
                            <Spacer my={1} />
                            {!isUploaded && (
                                <Button onPress={uploadDocument}>
                                    Upload document
                                </Button>
                            )}
                            {isUploaded && (
                                <Text color="success.500" textAlign={"center"}>
                                    Your document has been successfully
                                    uploaded.
                                </Text>
                            )}
                        </>
                    )}
                </View>
            </Modal>
            <Modal
                isOpen={openDownloadModal}
                onClose={() => {
                    setOpenDownloadModal(false);
                    clearDownload();
                }}
            >
                <View
                    backgroundColor={"white"}
                    p={"55px"}
                    borderRadius={"10px"}
                >
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
                        <Button
                            onPress={downloadDocument}
                            bgColor={"success.600"}
                        >
                            Download pdf
                        </Button>
                    )}
                </View>
            </Modal>
        </View>
    );
};

export default CaseOverviewScreen;
