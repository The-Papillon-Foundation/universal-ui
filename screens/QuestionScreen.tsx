import { NativeEventEmitter, StyleSheet } from "react-native";
import React, { createContext, useContext } from "react";
import { Box, Button, Center, Text } from "native-base";
import { useQuestions } from "../hooks/useQuestions";
import Question from "../components/Question";
import { ParamListBase } from "@react-navigation/native";
import { customTheme } from "../papillon-design-system/custom-theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type Props = {};
export interface QuestionStackParams extends ParamListBase {
    Question: {
        place: number;
        prompt: string;
        type: string;
        options?: string[];
    };
}
const QuestionStack = createNativeStackNavigator<QuestionStackParams>();

const QuestionScreen = (props: Props) => {
    const { nextStep } = useQuestions();
    return (
        <QuestionContext.Provider value={{ nextStep }}>
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
                <QuestionStack.Screen name={"Start"} component={StartScreen} />
                <QuestionStack.Screen
                    name={"Question"}
                    component={Question}
                    options={({ route }) => ({
                        title: (route.params.place + 1).toString(),
                        type: route.params.place,
                        prompt: route.params.prompt,
                        options: route.params.options,
                    })}
                />
            </QuestionStack.Navigator>
        </QuestionContext.Provider>
    );
};

const StartScreen = () => {
    const questionContext = useContext(QuestionContext);
    return <Button onPress={questionContext.nextStep}>A screen</Button>;
};

export const QuestionContext = createContext<{
    nextStep: undefined | (() => void);
}>({ nextStep: undefined });

export default QuestionScreen;

const styles = StyleSheet.create({});
