import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QuestionContainer from "../components/QuestionContainer";
import TextInputQuestion from "../components/TextInputQuestion";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

const DetermineWorkflow = () => {
    const navigation =
        useNavigation<
            StackNavigationProp<RootStackParamList, "DetermineWorkflow">
        >();
    const handleResponse = () => {
        navigation.push("Questions");
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
