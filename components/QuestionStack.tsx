import React, { useState } from "react";
import { Module, RootStackParamList } from "../types";
import { ArrowForwardIcon, Button, Text, View } from "native-base";
import Question from "./Question";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    module: Module;
    navigable: boolean;
    onFinish: () => void;
};

const QuestionStack = ({ module, navigable, onFinish }: Props) => {
    const [groupIndex, setGroupIndex] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const navigation =
        useNavigation<
            StackNavigationProp<RootStackParamList, "Process" | "Eligibility">
        >();

    const goBack = () => {
        if (questionIndex == 0) return;
        else setQuestionIndex((questionIndex) => questionIndex - 1);
    };

    const skipQuestion = () => {
        if (questionIndex >= module.card_groups[groupIndex].cards.length - 1)
            return;
        else setQuestionIndex((questionIndex) => questionIndex + 1);
    };

    const goNext = (id: string | null) => {
        if (id == null) {
            if (groupIndex >= module.card_groups.length - 1) {
                // All groups answered
                onFinish();
            } else {
                setQuestionIndex(0);
                setGroupIndex((groupIndex) => groupIndex + 1);
            }
        } else {
            const questionIndex = module.card_groups[
                groupIndex
            ].cards.findIndex((c) => c.id == id);
            setQuestionIndex(questionIndex);
        }
    };

    const goIneligible = ({ message }: { message: string }) => {
        navigation.navigate("Ineligible", { message });
    };

    return (
        <View flex={1} justifyContent={"center"}>
            <Question
                card={module.card_groups[groupIndex].cards[questionIndex]}
                group={module.card_groups[groupIndex]}
                goNext={goNext}
                goIneligible={goIneligible}
                onFinish={onFinish}
            />
            <View my={"5px"} />
            <View
                px={10}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                {navigable && (
                    <Button
                        w="56px"
                        h="56px"
                        borderRadius={"50%"}
                        bgColor={customTheme.colors.arrow_button}
                        onPress={goBack}
                    >
                        <ArrowForwardIcon
                            style={{ transform: [{ rotateY: "180deg" }] }}
                        />
                    </Button>
                )}
                {navigable && (
                    <Button
                        w="56px"
                        h="56px"
                        borderRadius={"50%"}
                        bgColor={customTheme.colors.arrow_button}
                        onPress={skipQuestion}
                        isDisabled={
                            questionIndex >=
                            module.card_groups[groupIndex].cards.length - 1
                        }
                    >
                        <ArrowForwardIcon />
                    </Button>
                )}
            </View>
        </View>
    );
};

export default QuestionStack;
