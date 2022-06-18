import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QuestionContainer from "../components/QuestionContainer";
import TextInputQuestion from "../components/TextInputQuestion";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

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
        navigation.push("Questions", { stateName: state });
    };
    return (
        <QuestionContainer>
            <TextInputQuestion
                prompt="What state do you live in?"
                handleResponse={handleResponse}
            />
        </QuestionContainer>
    );
};

export default DetermineWorkflow;

const styles = StyleSheet.create({});
