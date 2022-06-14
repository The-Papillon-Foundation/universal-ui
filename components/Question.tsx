import { NativeEventEmitter, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
    QuestionContext,
    QuestionStackParams,
} from "../screens/QuestionScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import YesOrNoQuestion from "./YesOrNoQuestion";
import DateQuestion from "./DateQuestion";
import MultiSelectQuestion from "./MultiSelectQuestion";
import { useQuestions } from "../hooks/useQuestions";

type Props = {};

const Question = (props: Props) => {
    const { params } = useRoute<RouteProp<QuestionStackParams, "Question">>();
    const questionContext = useContext(QuestionContext);

    const _handleResponse = () => {
        questionContext.nextStep!();
    };

    switch (params.type) {
        case "YesOrNo":
            return (
                <YesOrNoQuestion
                    place={params.place}
                    prompt={params.prompt}
                    handleResponse={_handleResponse}
                />
            );
        case "DateSelection":
            return (
                <DateQuestion
                    place={params.place}
                    prompt={params.prompt}
                    handleResponse={_handleResponse}
                />
            );
        case "MultiSelectQuestion":
            return (
                <MultiSelectQuestion
                    place={params.place}
                    prompt={params.prompt}
                    options={params.options!}
                    handleResponse={_handleResponse}
                />
            );
        default:
            return (
                <Text>Unable to find this type of question: {params.type}</Text>
            );
    }
};

export default Question;

const styles = StyleSheet.create({});
