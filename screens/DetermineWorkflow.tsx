import React from "react";
import QuestionContainer from "../components/QuestionContainer";
import TextInputQuestion from "../components/TextInputQuestion";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "native-base";

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "DetermineWorkflow">;
}

const DetermineWorkflow = ({ navigation }: Props) => {
    // const navigation =
    //     useNavigation<
    //         StackNavigationProp<RootStackParamList, "DetermineWorkflow">
    //     >();
    const handleResponse = (state: string) => {
        if (state == "") return;
        navigation.push("Workflow", { stateName: state });
    };
    return (
        <View flex={1} alignItems={"center"} justifyContent="center">
            <QuestionContainer>
                <TextInputQuestion
                    prompt="What state do you live in?"
                    handleResponse={handleResponse}
                />
            </QuestionContainer>
        </View>
    );
};

export default DetermineWorkflow;
