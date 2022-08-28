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
import { useLogin } from "../hooks/useLogin";
import { GlobalContext } from "../contexts/GlobalContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { customTheme } from "../hooks/useCachedResources";
import HomeNavBar from "../components/HomeNavBar";
import CaseCard from "../components/CaseCard";
import useGetCases from "../hooks/useGetCases";
import states from "../assets/data/states.json";

export const findStateNameByAbbrev = (abbrev: string) => {
    const stateName = Object.keys(states).find(
        (stateName) => (states as any)[stateName] === abbrev
    );
    return stateName || "";
};

export const unixToHumanReadableDate = (unixTimestamp: number) => {
    // replace the . with 0
    let timestamp = 1000 * unixTimestamp;
    let date = new Date(timestamp).toLocaleDateString();
    return date;
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen = ({ navigation }: Props) => {
    const { logout } = useLogin();
    const { sessionId, userId, checkedForSession } = useContext(GlobalContext);
    const { isLoading, error, cases } = useGetCases();

    const screenSize = useBreakpointValue({
        base: "base",
        md: "md",
    });

    const goToCase = (sessionId: string) => {
        navigation.push("Case", { sessionId });
    };

    useEffect(() => {
        if (checkedForSession && userId == "") {
            navigation.navigate("Landing");
        }
    }, [checkedForSession]);

    if (checkedForSession == false) {
        return <Spinner color="trueGray.600" size="lg" />;
    }

    return (
        <View flex={1}>
            <HomeNavBar />
            {/* Content */}
            {isLoading && <Spinner color="trueGray.600" size="lg" mt="10px" />}
            <View flex={1} justifyContent={["start", "center"]}>
                {error && <Text>{JSON.stringify(error)}</Text>}
                {cases != undefined && (
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
                            {cases.map((user_case) => (
                                <View
                                    key={JSON.stringify(user_case)}
                                    marginRight={{ base: 0, md: "30px" }}
                                >
                                    <CaseCard
                                        onPress={() =>
                                            goToCase(user_case.sessionId)
                                        }
                                        completion={
                                            user_case.sessionState.completion
                                        }
                                        title={findStateNameByAbbrev(
                                            user_case.workflowId
                                        )}
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
                                            Case{" "}
                                            {user_case.caseNumber ||
                                                "number unknown"}
                                        </Text>
                                        {/* dates */}
                                        <Text
                                            mt={"10px"}
                                            fontFamily={"sf-pro"}
                                            color={
                                                customTheme.colors
                                                    .case_card_dates
                                            }
                                            fontSize={"xs"}
                                        >
                                            <Text>
                                                Date Created:{" "}
                                                {unixToHumanReadableDate(
                                                    user_case.createdAt
                                                )}
                                            </Text>
                                            {"\n"}
                                            <Text>
                                                Date Updated:{" "}
                                                {unixToHumanReadableDate(
                                                    user_case.updatedAt
                                                )}
                                            </Text>
                                        </Text>
                                    </CaseCard>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    dateText: {},
});
