import React, { useState } from "react";
import { CardGroup, RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import HomeNavBar from "../components/HomeNavBar";
import { findStateNameByAbbrev } from "./HomeScreen";
import {
    Button,
    CheckCircleIcon,
    Heading,
    Image,
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
import { CalendarTick, Folder2, Scroll } from "iconsax-react-native";

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
                borderColor={
                    customTheme.colors.document_management_button_border
                }
                backgroundColor={
                    customTheme.colors.document_management_button_background
                }
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
                    color={customTheme.colors.document_management_button_icon}
                />
            </View>
        </TouchableOpacity>
        <View>
            <Text
                fontFamily="sf-pro-bold"
                fontSize={{ base: "sm", md: "lg" }}
                color={customTheme.colors.instruction_text}
                textAlign="center"
                mt={"20px"}
            >
                {instructionText}
            </Text>
        </View>
    </View>
);

enum CaseMode {
    timeline = 0,
    documents = 1,
}

const CaseOverviewScreen = ({ navigation, route }: Props) => {
    const { isLoading, error, currentCase } = useGetCase(
        route.params.sessionId
    );
    const [mode, setMode] = useState<CaseMode>(CaseMode.timeline);
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

    const goToCardGroup = (
        cg: CardGroup,
        index: number,
        workflowId: string
    ) => {
        navigation.push("Process", {
            stateName: workflowId,
            questionIndex: Math.max(
                cg.questions.findIndex(
                    (question) => question.answers.user == null
                ) - 1,
                0
            ),
            groupIndex: index,
        });
    };

    return (
        <View
            flex={1}
            backgroundColor={{
                base: customTheme.colors.case_overview_screen_mobile_background,
                md: customTheme.colors.case_overview_screen_desktop_background,
            }}
        >
            <HomeNavBar />

            <View
                mt={{ base: "25px", md: "42px" }}
                mx={{ base: "15px", md: "50px" }}
                flex={1}
            >
                {/* Top Bar with mode selection */}
                <View
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent={{ md: "space-between" }}
                >
                    {/* Navigation and Case information */}
                    <View>
                        <Text
                            textDecorationLine={"underline"}
                            fontFamily="sf-pro-medium"
                            fontSize="lg"
                            color="trueGray.600"
                            onPress={() => navigation.pop()}
                        >
                            Back to My Cases
                        </Text>
                        <View mb="25px">
                            {currentCase != undefined && (
                                <>
                                    {" "}
                                    <Text
                                        fontFamily={"poppins-bold"}
                                        fontSize="2xl"
                                        color={
                                            customTheme.colors.case_card_title
                                        }
                                    >
                                        {findStateNameByAbbrev(
                                            currentCase.workflowId
                                        )}
                                    </Text>
                                    <Text
                                        fontSize={"md"}
                                        fontFamily="sf-pro-bold"
                                        color={
                                            customTheme.colors
                                                .case_card_case_number
                                        }
                                    >
                                        Case {currentCase.caseNumber}
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                    {/* Mode selector */}
                    <View alignSelf={{ base: "center", md: undefined }}>
                        <View
                            bgColor={
                                customTheme.colors
                                    .case_overview_screen_mobile_background
                            }
                            flexDirection="row"
                            alignItems={"center"}
                            padding="10px"
                            borderRadius={"22px"}
                        >
                            <TouchableOpacity
                                onPress={() => setMode(CaseMode.timeline)}
                            >
                                <View
                                    bgColor={
                                        mode == CaseMode.timeline
                                            ? "white"
                                            : undefined
                                    }
                                    shadow={
                                        mode == CaseMode.timeline
                                            ? 3
                                            : undefined
                                    }
                                    style={{
                                        shadowColor: "#526971",
                                        shadowOpacity: 0.15,
                                    }}
                                    width="143px"
                                    height="45px"
                                    alignItems={"center"}
                                    justifyContent="center"
                                    marginRight="5px"
                                    borderRadius={"15px"}
                                    flexDirection="row"
                                    opacity={
                                        mode == CaseMode.timeline ? 1 : 0.5
                                    }
                                >
                                    <CalendarTick
                                        color={
                                            customTheme.colors.case_card_title
                                        }
                                        variant="Outline"
                                        size={24}
                                    />
                                    <Text
                                        ml="5px"
                                        color={
                                            customTheme.colors.case_card_title
                                        }
                                        fontFamily={"manrope-extrabold"}
                                    >
                                        Timeline
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setMode(CaseMode.documents)}
                            >
                                <View
                                    bgColor={
                                        mode == CaseMode.documents
                                            ? "white"
                                            : undefined
                                    }
                                    shadow={
                                        mode == CaseMode.documents
                                            ? 3
                                            : undefined
                                    }
                                    style={{
                                        shadowColor: "#526971",
                                        shadowOpacity: 0.15,
                                    }}
                                    width="143px"
                                    height="45px"
                                    alignItems={"center"}
                                    justifyContent="center"
                                    marginLeft="5px"
                                    borderRadius={"15px"}
                                    flexDirection="row"
                                    opacity={
                                        mode == CaseMode.documents ? 1 : 0.5
                                    }
                                >
                                    <Folder2
                                        color={
                                            customTheme.colors.case_card_title
                                        }
                                        variant="Outline"
                                        size={24}
                                    />
                                    <Text
                                        ml="5px"
                                        fontFamily={"manrope-extrabold"}
                                        color={
                                            customTheme.colors.case_card_title
                                        }
                                    >
                                        Documents
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {isLoading && (
                    <ActivityIndicator
                        style={{ alignSelf: "center", marginTop: "25%" }}
                    />
                )}
                {currentCase && (
                    <View flex={1} mb={"15px"}>
                        {mode == CaseMode.documents && (
                            <View
                                flex={1}
                                backgroundColor={{
                                    base: undefined,
                                    md: customTheme.colors
                                        .case_overview_screen_timeline_desktop_background,
                                }}
                                borderRadius="24px"
                                flexDirection={{ base: "column", md: "row" }}
                                overflow={"scroll"}
                            >
                                <View
                                    flex={1}
                                    borderRightWidth={{
                                        base: undefined,
                                        md: "2px",
                                    }}
                                    borderColor={"#FFF"}
                                >
                                    <View
                                        p="20px"
                                        borderBottomWidth="2px"
                                        borderColor={"#FFF"}
                                    >
                                        <Text
                                            ml="5px"
                                            color={
                                                customTheme.colors
                                                    .case_card_title
                                            }
                                            fontFamily={"manrope-extrabold"}
                                            fontSize="lg"
                                        >
                                            Identification
                                        </Text>
                                    </View>
                                    <View
                                        flex={1}
                                        alignItems={"center"}
                                        justifyContent="center"
                                        p="20px"
                                    ></View>
                                </View>
                                <View flex={3}>
                                    <View
                                        p="20px"
                                        borderBottomWidth="2px"
                                        borderColor={"#FFF"}
                                    >
                                        <Text
                                            ml="5px"
                                            color={
                                                customTheme.colors
                                                    .case_card_title
                                            }
                                            fontFamily={"manrope-extrabold"}
                                            fontSize="lg"
                                        >
                                            Forms
                                        </Text>
                                    </View>
                                    <View
                                        flex={1}
                                        alignItems={"center"}
                                        justifyContent="center"
                                        flexDirection={{
                                            base: "column",
                                            md: "row",
                                        }}
                                        p="20px"
                                    ></View>
                                </View>
                            </View>
                        )}
                        {mode == CaseMode.timeline && (
                            <ScrollView
                                flex={1}
                                showsVerticalScrollIndicator={false}
                            >
                                <View>
                                    <Stack
                                        justifyContent={{ md: "center" }}
                                        flex={1}
                                        direction={{
                                            base: "column",
                                            md: "row",
                                        }}
                                        flexWrap={{ md: "wrap" }}
                                        backgroundColor={{
                                            base: undefined,
                                            md: customTheme.colors
                                                .case_overview_screen_timeline_desktop_background,
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
                                                <CaseCardGroup
                                                    key={cg.name}
                                                    cg={cg}
                                                    cgs={cgs}
                                                    index={index}
                                                    onPress={() =>
                                                        goToCardGroup(
                                                            cg,
                                                            index,
                                                            currentCase.workflowId
                                                        )
                                                    }
                                                />
                                            ))}
                                    </Stack>
                                </View>
                            </ScrollView>
                        )}
                    </View>
                )}
            </View>
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

const CaseCardGroup = ({
    index,
    cg,
    cgs,
    onPress,
}: {
    index: number;
    cg: CardGroup;
    cgs: CardGroup[];
    onPress: () => void;
}) => (
    <View
        key={index}
        w={{
            base: "100%",
            md: "375px",
        }}
        alignItems={{
            md: "center",
        }}
        flexDirection={{
            base: "row",
            md: "column",
        }}
    >
        <View
            my={{
                base: 0,
                md: "24px",
            }}
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
                borderLeftRadius={index == 0 ? "30px" : undefined}
                borderColor={
                    index == 0 && cg.completion == "1.0"
                        ? customTheme.colors.case_horizontal_divider
                        : index != 0 && cgs[index - 1].completion == "1.0"
                        ? customTheme.colors.case_horizontal_divider
                        : customTheme.colors.incomplete_status_bar
                }
            />
            <View
                height={"20px"}
                width={"20px"}
                borderRadius={"30px"}
                borderWidth={cg.completion == "1.0" ? undefined : "3px"}
                borderColor={
                    cg.completion == "1.0" ||
                    (index != 0 && cgs[index - 1].completion == "1.0")
                        ? customTheme.colors.case_horizontal_divider
                        : customTheme.colors.incomplete_status_bar
                }
                alignItems="center"
            >
                {cg.completion == "1.0" && (
                    <CheckCircleIcon
                        size="35px"
                        color={customTheme.colors.case_horizontal_divider}
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
                borderRightRadius={cgs.length - 1 == index ? "30px" : undefined}
                borderColor={
                    cg.completion == "1.0"
                        ? customTheme.colors.case_horizontal_divider
                        : customTheme.colors.incomplete_status_bar
                }
            />
        </View>

        <CaseCard onPress={() => {}} completion={cg.completion} title={cg.name}>
            <Text
                fontFamily={"sf-pro-medium"}
                fontSize="sm"
                color="trueGray.400"
            >
                {cg.description}
            </Text>
            <View mt="12px">
                <Button
                    onPress={onPress}
                    w="50%"
                    bgColor={
                        Number(cg.completion) == 1
                            ? customTheme.colors.signup_button_surface
                            : Number(cg.completion) > 0
                            ? customTheme.colors
                                  .mobile_question_screen_background
                            : customTheme.colors.case_horizontal_divider
                    }
                >
                    {Number(cg.completion) == 1
                        ? "Review"
                        : Number(cg.completion) > 0
                        ? "Continue"
                        : "Start"}
                </Button>
            </View>
        </CaseCard>
    </View>
);

export default CaseOverviewScreen;

// old document selection
{
    /* <View>
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
</View> */
}
