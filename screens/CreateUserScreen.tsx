import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCreateSession } from "../hooks/useCreateSession";
import { customTheme } from "../hooks/useCachedResources";
import { View } from "native-base";
import ForceLoginScreen from "../components/ForceLogin";
import Navbar from "../components/Navbar";
import QuestionContainer from "../components/QuestionContainer";

type Props = {
    route: RouteProp<RootStackParamList, "CreateUser">;
    navigation: StackNavigationProp<RootStackParamList, "CreateUser">;
};

const CreateUserScreen = ({ route, navigation }: Props) => {
    // creates a session and stores it in global context
    useCreateSession(route.params.stateName!);

    const onFinish = () => {
        navigation.navigate("Process", {
            stateName: route.params.stateName,
            groupIndex: 0,
            questionIndex: 0,
        });
    };

    return (
        <View
            flex={1}
            bgColor={{
                base: customTheme.colors.mobile_question_screen_background,
                md: customTheme.colors.large_question_screen_background,
            }}
        >
            <Navbar />
            <View flex={1} justifyContent="center" alignItems="center">
                <QuestionContainer>
                    <ForceLoginScreen navigation={navigation} route={route} />
                </QuestionContainer>
            </View>
        </View>
    );
};

export default CreateUserScreen;
