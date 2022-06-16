import { NativeEventEmitter, StyleSheet } from "react-native";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { Box, Button, Center, Container, Heading, Text } from "native-base";
import Question from "../components/Question";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
import { customTheme } from "../papillon-design-system/custom-theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QuestionCard, QuestionGroup, RootStackParamList } from "../types";
import usePayload from "../hooks/usePayload";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
    route: RouteProp<RootStackParamList, "Questions">;
};
export interface QuestionStackParams extends ParamListBase {
    Question: { card: QuestionCard; group: QuestionGroup };
    Start: undefined;
    Ineligible: undefined | { message: string };
}
const QuestionStack = createNativeStackNavigator<QuestionStackParams>();

const QuestionScreen = ({ route }: Props) => {
    const [finishedCardGroups, setFinishedCardGroups] = useState<string[]>([]);

    return (
        <QuestionContext.Provider
            value={{ finishedCardGroups, setFinishedCardGroups }}
        >
            <QuestionStack.Navigator
                initialRouteName="Start"
                screenOptions={{
                    headerStyle: {
                        backgroundColor:
                            customTheme.colors["surface-secondary"],
                    },
                    headerTitleAlign: "center",
                    headerTintColor: customTheme.colors["on-button-surface"],
                }}
            >
                <QuestionStack.Screen
                    name={"Start"}
                    component={StartScreen}
                    options={{ headerShown: false }}
                />
                <QuestionStack.Screen
                    name={"Question"}
                    component={Question}
                    options={({ route }) => ({
                        title: route.params.group.name,
                    })}
                />
                <QuestionStack.Screen
                    name={"Ineligible"}
                    component={IneligibleScreen}
                    options={{ headerShown: false }}
                />
            </QuestionStack.Navigator>
        </QuestionContext.Provider>
    );
};

export interface StartScreenProps {
    route: RouteProp<QuestionStackParams, "Start">;
    navigation: StackNavigationProp<QuestionStackParams, "Start">;
}

const StartScreen = ({ route, navigation }: StartScreenProps) => {
    const { error, isLoading, payload } = usePayload();
    const { finishedCardGroups } = useContext(QuestionContext);

    const navigateToQuestion = (card: QuestionCard, group: QuestionGroup) => {
        navigation.push("Question", { card, group });
    };

    return (
        <Box flex={1} justifyContent="center">
            <Center>
                <Container centerContent>
                    {isLoading && <Text>Loading...</Text>}
                    {error && <Text>There has been an error</Text>}
                    {payload != undefined && (
                        <>
                            <Heading size={"4xl"}>Modules to complete</Heading>
                            <Box m={1} />
                            <Box>
                                {payload[0].eligibility_module != undefined && (
                                    <Center>
                                        <Heading size="lg">
                                            Eligibility Module
                                        </Heading>
                                        <Box m={1} />
                                        {payload[0].eligibility_module.card_groups.map(
                                            (group: QuestionGroup) => (
                                                <Button
                                                    isDisabled={finishedCardGroups.includes(
                                                        group.id
                                                    )}
                                                    onPress={() =>
                                                        navigateToQuestion(
                                                            group.cards[0],
                                                            group
                                                        )
                                                    }
                                                >
                                                    {group.name}
                                                </Button>
                                            )
                                        )}
                                    </Center>
                                )}
                            </Box>
                            <Box m={2} />
                            <Box>
                                {payload[0].process_module != undefined && (
                                    <Center>
                                        <Heading size="lg">
                                            {" "}
                                            Process Module
                                        </Heading>
                                        <Box m={1} />
                                        {payload[0].process_module.card_groups.map(
                                            (group: any) => (
                                                <>
                                                    <Button
                                                        isDisabled={finishedCardGroups.includes(
                                                            group.id
                                                        )}
                                                        onPress={() =>
                                                            navigateToQuestion(
                                                                group.cards[0],
                                                                group
                                                            )
                                                        }
                                                    >
                                                        {group.name}
                                                    </Button>
                                                    <Box m={0.5} />
                                                </>
                                            )
                                        )}
                                    </Center>
                                )}
                            </Box>
                        </>
                    )}
                </Container>
            </Center>
        </Box>
    );
};

export const IneligibleScreen = () => {
    const { params } = useRoute<RouteProp<QuestionStackParams, "Ineligible">>();
    return (
        <Center flex={1} justifyContent="center">
            <Container centerContent>
                <Heading>You are ineligible for expungment</Heading>
                {params?.message && (
                    <Text textAlign={"center"}>{params.message}</Text>
                )}
            </Container>
        </Center>
    );
};

export const QuestionContext = createContext<{
    finishedCardGroups: string[];
    setFinishedCardGroups: Dispatch<SetStateAction<string[]>>;
}>({
    finishedCardGroups: [],
    setFinishedCardGroups: () => {},
});

export default QuestionScreen;

const styles = StyleSheet.create({});
