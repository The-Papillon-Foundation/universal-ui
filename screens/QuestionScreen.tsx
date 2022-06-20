import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Question from "../components/Question";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { customTheme } from "../papillon-design-system/custom-theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QuestionCard, QuestionGroup, RootStackParamList } from "../types";
import WorkflowLoading from "./WorkflowLoading";
import { IneligibleScreen } from "./IneligibleScreen";
import { QuestionContext } from "../contexts/QuestionContext";
import ForceLoginScreen from "./ForceLoginScreen";

type Props = {
    route: RouteProp<RootStackParamList, "Questions">;
};
export interface QuestionStackParams extends ParamListBase {
    WorkflowLoading: { stateName?: string };
    Question: { card: QuestionCard; group: QuestionGroup };
    Ineligible: undefined | { message: string };
}
const QuestionStack = createNativeStackNavigator<QuestionStackParams>();

const QuestionScreen = ({ route }: Props) => {
    const [finishedCardGroups, setFinishedCardGroups] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <QuestionContext.Provider
            value={{
                finishedCardGroups,
                setFinishedCardGroups,
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            <QuestionStack.Navigator
                initialRouteName="WorkflowLoading"
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
                    name="WorkflowLoading"
                    component={WorkflowLoading}
                    options={{ headerShown: false }}
                    initialParams={{ stateName: route.params?.stateName }}
                />
                <QuestionStack.Screen
                    name="ForceLogin"
                    component={ForceLoginScreen}
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

export default QuestionScreen;

const styles = StyleSheet.create({});
