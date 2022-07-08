import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import useWorkflow from "../hooks/useWorkflow";
import { useCreateSession } from "../hooks/useCreateSession";
import QuestionStack from "../components/QuestionStack";
import { ActivityIndicator } from "react-native-paper";
import { customTheme } from "../hooks/useCachedResources";
import { View } from "native-base";

type Props = {
    route: RouteProp<RootStackParamList, "Eligibility">;
    navigation: StackNavigationProp<RootStackParamList, "Eligibility">;
};

const EligibilityScreen = ({ route, navigation }: Props) => {
    // fetch eligibility module
    const { error, isLoading, data } = useWorkflow(route.params.stateName!);
    // creates a session and stores it in global context
    useCreateSession(route.params.stateName!);

    const onFinish = () => {
        navigation.navigate("CreateUser", {
            stateName: route.params.stateName,
        });
    };

    return (
        <View flex={1} justifyContent="center" alignContent={"center"}>
            {isLoading && (
                <ActivityIndicator
                    size="large"
                    color={customTheme.colors.primary[500]}
                />
            )}
            {data != undefined && data.eligibility_module != undefined && (
                <QuestionStack
                    module={data.eligibility_module}
                    navigable={false}
                    onFinish={onFinish}
                />
            )}
        </View>
    );
};

export default EligibilityScreen;
