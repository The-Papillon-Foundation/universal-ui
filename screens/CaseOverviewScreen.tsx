import React from "react";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import HomeNavBar from "../components/HomeNavBar";
import { casesRes } from "./HomeScreen";
import {
    Button,
    CheckCircleIcon,
    ScrollView,
    Stack,
    Text,
    useBreakpointValue,
    View,
} from "native-base";
import { customTheme } from "../hooks/useCachedResources";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import CaseCard from "../components/CaseCard";

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
        <TouchableOpacity>
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
    const currentCase =
        casesRes[
            casesRes.findIndex((c) => c.caseNumber == route.params.caseNumber)
        ];
    const screenSize = useBreakpointValue({
        base: "base",
        md: "md",
    });

    return (
        <View flex={1}>
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
                    {currentCase ? (
                        <>
                            <View>
                                <Text
                                    fontFamily={"poppins-bold"}
                                    fontSize="2xl"
                                    color={customTheme.colors.case_card_title}
                                >
                                    {currentCase.name}
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
                                        onPress={() => {}}
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
                                        onPress={() => {}}
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
                                >
                                    {currentCase.cardGroups.map(
                                        (cg, index, cgs) => (
                                            <View
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
                                                            cg.completion == 100
                                                                ? customTheme
                                                                      .colors
                                                                      .case_horizontal_divider
                                                                : index != 0 &&
                                                                  cgs[index - 1]
                                                                      .completion ==
                                                                      100
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
                                                            cg.completion == 100
                                                                ? undefined
                                                                : "3px"
                                                        }
                                                        borderColor={
                                                            cg.completion ==
                                                                100 ||
                                                            (index != 0 &&
                                                                cgs[index - 1]
                                                                    .completion ==
                                                                    100)
                                                                ? customTheme
                                                                      .colors
                                                                      .case_horizontal_divider
                                                                : "#C5E7EF"
                                                        }
                                                        alignItems="center"
                                                    >
                                                        {cg.completion ==
                                                            100 && (
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
                                                            cg.completion == 100
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
                                                            w="50%"
                                                            bgColor={
                                                                cg.completion ==
                                                                100
                                                                    ? "teal.500"
                                                                    : cg.completion >
                                                                      0
                                                                    ? "cyan.800"
                                                                    : "cyan.600"
                                                            }
                                                        >
                                                            {cg.completion ==
                                                            100
                                                                ? "Review"
                                                                : cg.completion >
                                                                  0
                                                                ? "Continue"
                                                                : "Start"}
                                                        </Button>
                                                    </View>
                                                </CaseCard>
                                            </View>
                                        )
                                    )}
                                </Stack>
                            </View>
                        </>
                    ) : (
                        <View>
                            Case {route.params.caseNumber} does not exist.
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default CaseOverviewScreen;
