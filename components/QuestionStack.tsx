import React, { useState } from "react";
import { Module } from "../types";
import { Button, Container, Stack, Text, View } from "native-base";
import Question from "./Question";

type Props = {
    module: Module;
    currentIndex?: number;
};

const QuestionStack = ({ module }: Props) => {
    const [groupIndex, setGroupIndex] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);

    const goBack = () => {
        if (questionIndex == 0) return;
        else setQuestionIndex((questionIndex) => questionIndex - 1);
    };

    const goNext = () => {
        if (questionIndex >= module.card_groups[groupIndex].cards.length - 1) {
            if (groupIndex >= module.card_groups.length - 1) {
                // All groups answer
            } else {
                setQuestionIndex(0);
                setGroupIndex((groupIndex) => groupIndex + 1);
            }
        } else setQuestionIndex((questionIndex) => questionIndex + 1);
    };

    const goIneligible = ({ message }: { message: string }) => {
        console.log("Ineligible");
    };

    return (
        <View alignItems={"center"}>
            <View
                px={10}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <Button onPress={goBack}>Back</Button>
                <Button onPress={goNext}>Next</Button>
            </View>
            <View my={5} />
            <Question
                card={module.card_groups[groupIndex].cards[questionIndex]}
                group={module.card_groups[groupIndex]}
                goNext={goNext}
                goIneligible={goIneligible}
            />
        </View>
    );
};

export default QuestionStack;
