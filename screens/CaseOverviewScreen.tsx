import React from "react";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import HomeNavBar from "../components/HomeNavBar";
import { casesRes } from "./HomeScreen";
import { Stack, Text, View } from "native-base";
import { customTheme } from "../hooks/useCachedResources";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Props = StackScreenProps<RootStackParamList, "Case">;

const DocumentManagementButton = ({
    onPress,
    iconName,
    instructionText,
}: {
    onPress: () => void;
    iconName: string;
    instructionText: string;
}) => (
    <View>
        <TouchableOpacity>
            <View
                w="195px"
                h="160px"
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
                    size={80}
                    color={customTheme.colors.blueGray[400]}
                />
            </View>
        </TouchableOpacity>
        <View>
            <Text
                fontFamily="sf-pro-bold"
                fontSize="lg"
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

    return (
        <View>
            <HomeNavBar />

            <View mt={"42px"} mx={"50px"}>
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
                                color={customTheme.colors.case_card_case_number}
                            >
                                Case {currentCase.caseNumber}
                            </Text>
                        </View>
                        <View>
                            <Text>Document Management</Text>
                            <Stack
                                direction={"row"}
                                justifyContent="space-around"
                                mx="150px"
                                mt="25px"
                            >
                                <DocumentManagementButton
                                    onPress={() => {}}
                                    iconName="upload-outline"
                                    instructionText="Upload files"
                                />
                                <DocumentManagementButton
                                    onPress={() => {}}
                                    iconName="file-document-outline"
                                    instructionText="Review your form"
                                />
                                <DocumentManagementButton
                                    onPress={() => {}}
                                    iconName="download-outline"
                                    instructionText="Download file"
                                />
                            </Stack>
                        </View>
                        <View>
                            <Text>Question Modules</Text>
                            {currentCase.cardGroups.map((cg) => (
                                <Text>{cg.name}</Text>
                            ))}
                        </View>
                    </>
                ) : (
                    <View>Case {route.params.caseNumber} does not exist.</View>
                )}
            </View>
        </View>
    );
};

export default CaseOverviewScreen;
