import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import {
    Heading,
    Image,
    ScrollView,
    Text,
    useBreakpointValue,
    View,
    Spinner,
} from "native-base";
import { useDocumentUpload } from "../hooks/useDocumentUpload";
import { useDocumentDownload } from "../hooks/useDocumentDownload";
import { useLogin } from "../hooks/useLogin";
import { GlobalContext } from "../contexts/GlobalContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { customAssets, customTheme } from "../hooks/useCachedResources";
import HomeNavBar from "../components/HomeNavBar";
import CaseCard from "../components/CaseCard";

export const casesRes = [
    {
        name: "Jimmy's 2020 case",
        createdAt: "2022-07-20",
        updatedAt: "2022-08-02",
        caseNumber: 123456789154,
        sessionId: "12as3d5g1a65r155re5",
        completion: 50.0,
        cardGroups: [
            {
                completion: 100.0,
                name: "Law Enforcement Records",
                description:
                    "Follow the steps to obtain arrest record information from DPS.",
                questions: {
                    "question-id-1": {
                        user: "user-provided-answer",
                    },
                    "question-id-2": {
                        user: null,
                    },
                },
            },
            {
                completion: 50.0,
                name: "Court Records",
                description:
                    "Follow the steps to obtain arrest record information from DPS.",
                questions: {
                    "question-id-1": {
                        user: "user-provided-answer",
                    },
                    "question-id-2": {
                        user: null,
                    },
                },
            },
            {
                completion: 0.0,
                name: "Review and Sign",
                description:
                    "Review and sign your documents before mailing them out.",
                questions: {
                    "question-id-1": {
                        user: "user-provided-answer",
                    },
                    "question-id-2": {
                        user: null,
                    },
                },
            },
        ],
    },
    {
        name: "Jimmy's 2000 case",
        createdAt: "2022-07-20",
        updatedAt: "2022-08-02",
        caseNumber: 123456789123,
        sessionId: "12as3d5g1a65r155re5",
        completion: 100.0,
        cardGroups: [
            {
                completion: 100.0,
                name: "Law Enforcement Records",
                description:
                    "Follow the steps to obtain arrest record information from DPS.",
                questions: {
                    "question-id-1": {
                        user: "user-provided-answer",
                    },
                    "question-id-2": {
                        user: null,
                    },
                },
            },
            {
                completion: 50.0,
                name: "Court Records",
                description:
                    "Follow the steps to obtain arrest record information from DPS.",
                questions: {
                    "question-id-1": {
                        user: "user-provided-answer",
                    },
                    "question-id-2": {
                        user: null,
                    },
                },
            },
            {
                completion: 0.0,
                name: "Review and Sign",
                description:
                    "Review and sign your documents before mailing them out.",
                questions: {
                    "question-id-1": {
                        user: "user-provided-answer",
                    },
                    "question-id-2": {
                        user: null,
                    },
                },
            },
        ],
    },
    {
        name: "Jimmy's 2000 case",
        createdAt: "2022-07-20",
        updatedAt: "2022-08-02",
        caseNumber: 1234567893453,
        sessionId: "12as3d5g1a65r155re5",
        completion: 100.0,
        cardGroups: [
            {
                completion: 100.0,
                name: "Law Enforcement Records",
                description:
                    "Follow the steps to obtain arrest record information from DPS.",
                questions: {
                    "question-id-1": {
                        user: "user-provided-answer",
                    },
                    "question-id-2": {
                        user: null,
                    },
                },
            },
            {
                completion: 50.0,
                name: "Court Records",
                description:
                    "Follow the steps to obtain arrest record information from DPS.",
                questions: {
                    "question-id-1": {
                        user: "user-provided-answer",
                    },
                    "question-id-2": {
                        user: null,
                    },
                },
            },
            {
                completion: 0.0,
                name: "Review and Sign",
                description:
                    "Review and sign your documents before mailing them out.",
                questions: {
                    "question-id-1": {
                        user: "user-provided-answer",
                    },
                    "question-id-2": {
                        user: null,
                    },
                },
            },
        ],
    },
];

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
    const screenSize = useBreakpointValue({
        base: "base",
        md: "md",
    });

    const goToCase = (caseNumber: number) => {
        navigation.push("Case", { caseNumber });
    };

    useEffect(() => {
        if (checkedForSession && sessionId == "") {
            navigation.navigate("Landing");
        }
    }, [checkedForSession, sessionId]);

    if (checkedForSession == false) {
        return <Spinner color="trueGray.600" size="lg" />;
    }

    return (
        <View flex={1}>
            <HomeNavBar />
            {/* Content */}
            <View flex={1} justifyContent={["start", "center"]}>
                <View
                    marginX={{ base: "25px", md: "50px" }}
                    mt={{ base: "20px", md: 0 }}
                >
                    <Heading
                        fontSize={"2xl"}
                        fontFamily="sf-pro-bold"
                        color={"trueGray.700"}
                        mb={"25px"}
                    >
                        My Cases
                    </Heading>
                    <ScrollView
                        w={"100%"}
                        horizontal={screenSize == "base" ? false : true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {casesRes.map((user_case) => (
                            <View marginRight={{ base: 0, md: "30px" }}>
                                <CaseCard
                                    onPress={() =>
                                        goToCase(user_case.caseNumber)
                                    }
                                    completion={user_case.completion}
                                    title={user_case.name}
                                >
                                    {/* case # */}
                                    <Text
                                        fontSize={"sm"}
                                        fontFamily="sf-pro-bold"
                                        color={
                                            customTheme.colors
                                                .case_card_case_number
                                        }
                                    >
                                        Case {user_case.caseNumber}
                                    </Text>
                                    {/* dates */}
                                    <Text
                                        mt={"10px"}
                                        fontFamily={"sf-pro"}
                                        color={
                                            customTheme.colors.case_card_dates
                                        }
                                        fontSize={"xs"}
                                    >
                                        <Text>
                                            Date Created:{" "}
                                            {new Date(
                                                user_case.createdAt
                                            ).toLocaleDateString()}
                                        </Text>
                                        {"\n"}
                                        <Text>
                                            Date Updated:{" "}
                                            {new Date(
                                                user_case.updatedAt
                                            ).toLocaleDateString()}
                                        </Text>
                                    </Text>
                                </CaseCard>
                            </View>
                        ))}
                    </ScrollView>
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
    //     </View>
    // );
};

export default HomeScreen;

const styles = StyleSheet.create({
    dateText: {},
});
