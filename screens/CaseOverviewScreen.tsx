import React, { useEffect, useState } from "react";
import { CardGroup, RootStackParamList, WorkflowSession } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import HomeNavBar from "../components/HomeNavBar";
import {
    Button,
    CheckCircleIcon,
    CheckIcon,
    Heading,
    ScrollView,
    Select,
    Text,
    View,
} from "native-base";
import { customTheme } from "../hooks/useCachedResources";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import CaseCard from "../components/CaseCard";
import useGetCase from "../hooks/useGetCase";
import { CalendarTick, Folder2 } from "iconsax-react-native";

type Props = StackScreenProps<RootStackParamList, "Case">;

enum CaseMode {
    timeline = 0,
    documents = 1,
}

const CaseOverviewScreen = ({ navigation, route }: Props) => {
    const { isLoading, cases, documents } = useGetCase();
    const [currentCase, setCurrentCase] = useState<WorkflowSession | null>();
    const [mode, setMode] = useState<CaseMode>(CaseMode.timeline);
    const {
        isLoading: isDownloadLoading,
        downloadDocument,
        prepareDownload,
        progress: downloadProgress,
        documentLink,
    } = useDocumentDownload();

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

    useEffect(() => {
        if (cases != null) {
            setCurrentCase(cases[0]);
        }
    }, [cases]);

    return (
        <View
            flex={1}
            backgroundColor={{
                base: customTheme.colors.case_overview_screen_mobile_background,
                md: customTheme.colors.case_overview_screen_desktop_background,
            }}
        >
            <HomeNavBar />

            {currentCase !== null && (
                <>
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
                                    fontFamily="sf-pro-medium"
                                    fontSize="14px"
                                    color="cyan.800"
                                >
                                    Current Case
                                </Text>
                                <View mb="25px">
                                    {cases !== undefined && cases.length > 0 && (
                                        <Select
                                            selectedValue={cases[0].sessionId}
                                            w={{ base: "100%", md: "100%" }}
                                            accessibilityLabel="Select one."
                                            placeholder="Select one."
                                            _selectedItem={{
                                                bg: "teal.600",
                                                endIcon: <CheckIcon size="5" />,
                                            }}
                                            color={"cyan.900"}
                                            fontFamily={"manrope-extrabold"}
                                            fontSize={"20px"}
                                            mt={2}
                                            onValueChange={(sessionId) =>
                                                setCurrentCase(
                                                    cases.find(
                                                        (c) =>
                                                            c.sessionId ==
                                                            sessionId
                                                    )
                                                )
                                            }
                                        >
                                            {cases.map((_case, index) => (
                                                <Select.Item
                                                    key={index}
                                                    label={
                                                        " Case " +
                                                        unixToHumanReadableDate(
                                                            _case.createdAt
                                                        )
                                                    }
                                                    value={_case.sessionId}
                                                />
                                            ))}
                                        </Select>
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
                                        onPress={() =>
                                            setMode(CaseMode.timeline)
                                        }
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
                                                mode == CaseMode.timeline
                                                    ? 1
                                                    : 0.5
                                            }
                                        >
                                            <CalendarTick
                                                color={
                                                    customTheme.colors
                                                        .case_card_title
                                                }
                                                variant="Outline"
                                                size={24}
                                            />
                                            <Text
                                                ml="5px"
                                                color={
                                                    customTheme.colors
                                                        .case_card_title
                                                }
                                                fontFamily={"manrope-extrabold"}
                                            >
                                                Timeline
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setMode(CaseMode.documents)
                                        }
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
                                                mode == CaseMode.documents
                                                    ? 1
                                                    : 0.5
                                            }
                                        >
                                            <Folder2
                                                color={
                                                    customTheme.colors
                                                        .case_card_title
                                                }
                                                variant="Outline"
                                                size={24}
                                            />
                                            <Text
                                                ml="5px"
                                                fontFamily={"manrope-extrabold"}
                                                color={
                                                    customTheme.colors
                                                        .case_card_title
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
                                style={{
                                    alignSelf: "center",
                                    marginTop: "25%",
                                }}
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
                                        flexDirection={{
                                            base: "column",
                                            md: "row",
                                        }}
                                        overflow={"scroll"}
                                    >
                                        <View
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
                                                    fontFamily={
                                                        "manrope-extrabold"
                                                    }
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
                                            >
                                                {documents &&
                                                    documents.length > 0 && (
                                                        <Image
                                                            source={{
                                                                uri: `data:image/jpeg;base64,${documents[0].base64ImageString}`,
                                                            }}
                                                            style={{
                                                                width: 200,
                                                                height: 100,
                                                            }}
                                                        />
                                                    )}
                                            </View>
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
                                                    fontFamily={
                                                        "manrope-extrabold"
                                                    }
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
                                            >
                                                <View alignItems={"center"}>
                                                    <QuestionHeader prompt="Download your document" />
                                                    {documentLink == "" ? (
                                                        <QuestionButton
                                                            onPress={
                                                                prepareDownload
                                                            }
                                                        >
                                                            {isDownloadLoading ? (
                                                                <ActivityIndicator color="white" />
                                                            ) : (
                                                                "Prepare Download"
                                                            )}
                                                            {downloadProgress >
                                                                0 && (
                                                                <ProgressBar
                                                                    progress={
                                                                        downloadProgress
                                                                    }
                                                                />
                                                            )}
                                                        </QuestionButton>
                                                    ) : (
                                                        <QuestionButton
                                                            onPress={
                                                                downloadDocument
                                                            }
                                                        >
                                                            Download pdf
                                                        </QuestionButton>
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                {mode == CaseMode.timeline && (
                                    <ScrollView
                                        flex={1}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <View
                                            justifyContent={{ md: "center" }}
                                            flex={1}
                                            flexDirection={{
                                                base: "column",
                                                md: "row",
                                            }}
                                            flexWrap={{ md: "wrap" }}
                                            backgroundColor={{
                                                base: undefined,
                                                md: customTheme.colors
                                                    .case_overview_screen_timeline_desktop_background,
                                            }}
                                            borderWidth={{ base: 0, md: 1 }}
                                            borderColor={"trueGray.200"}
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
                                        </View>
                                    </ScrollView>
                                )}
                            </View>
                        )}
                    </View>
                </>
            )}
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
            md: "365px",
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
            mt={{
                base: 0,
                md: "15px",
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
            <View flex={1} justifyContent={"space-between"} marginTop={"10px"}>
                <View>
                    <Text
                        fontFamily={"sf-pro-medium"}
                        fontSize="14"
                        color="trueGray.400"
                    >
                        {cg.description}
                    </Text>
                </View>

                <Button
                    onPress={onPress}
                    w="50%"
                    bgColor={
                        Number(cg.completion) == 1
                            ? "cyan.800"
                            : Number(cg.completion) > 0
                            ? "cyan.700"
                            : "cyan.600"
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

export const unixToHumanReadableDate = (unixTimestamp: number) => {
    // replace the . with 0
    let timestamp = 1000 * unixTimestamp;
    let date = new Date(timestamp).toLocaleDateString();
    return date;
};

import states from "../assets/data/states.json";
import { useDocumentDownload } from "../hooks/useDocumentDownload";
import { ProgressBar } from "react-native-paper";
import Question from "../components/Question";
import QuestionButton from "../components/QuestionButton";
import QuestionHeader from "../components/QuestionHeader";
export const findStateNameByAbbrev = (abbrev: string) => {
    const stateName = Object.keys(states).find(
        (stateName) => (states as any)[stateName] === abbrev
    );
    return stateName || "";
};

export default CaseOverviewScreen;
