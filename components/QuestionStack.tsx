import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Module, RootStackParamList } from "../types";
import { View as RNVIEW } from "react-native";
import { ArrowForwardIcon, Button, View } from "native-base";
import Question from "./Question";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    module: Module;
    navigable: boolean;
    onFinish: () => void;
};

const QuestionStack = ({ module, navigable, onFinish }: Props) => {
    const navigation =
        useNavigation<
            StackNavigationProp<RootStackParamList, "Process" | "Eligibility">
        >();
    const route = useRoute<RouteProp<RootStackParamList, "Process">>();
    const { questionIndex, groupIndex } = route.params;
    const containerRef = useRef<MutableRefObject<typeof View>>(null);

    const goBack = () => {
        if (questionIndex == 0 && groupIndex == 0) return;
        if (questionIndex == 0 && groupIndex > 0) {
            navigation.setParams({
                ...route.params,
                groupIndex: groupIndex - 1,
                questionIndex: module.card_groups[groupIndex].cards.length - 1,
            });
        } else {
            navigation.setParams({
                ...route.params,
                questionIndex: Number(questionIndex) - 1,
            });
        }
    };

    const skipQuestion = () => {
        if (questionIndex >= module.card_groups[groupIndex].cards.length - 1)
            return;
        else
            navigation.setParams({
                ...route.params,
                questionIndex: Number(questionIndex) + 1,
            });
    };

    const goNext = (id: string | null) => {
        if (id == null) {
            if (groupIndex >= module.card_groups.length - 1) {
                // All groups answered
                onFinish();
            } else {
                navigation.setParams({
                    ...route.params,
                    questionIndex: 0,
                    groupIndex: Number(groupIndex) + 1,
                });
            }
        } else {
            const questionIndex = module.card_groups[
                groupIndex
            ].cards.findIndex((c) => c.id == id);
            navigation.setParams({
                ...route.params,
                questionIndex,
            });
        }
    };

    const goIneligible = ({ message }: { message: string }) => {
        navigation.navigate("Ineligible", { message });
    };

    return (
        <View flex={1} ref={containerRef}>
            <View flex={10} justifyContent={"center"}>
                <Question
                    card={module.card_groups[groupIndex].cards[questionIndex]}
                    group={module.card_groups[groupIndex]}
                    goNext={goNext}
                    goIneligible={goIneligible}
                    onFinish={onFinish}
                />
            </View>

            <View
                flex={1}
                px={"10px"}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                {navigable && (
                    <Button
                        position={{ base: undefined, md: "absolute" }}
                        left={{ md: -100 }}
                        top={{ md: -200 }}
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
                        position={{ base: undefined, md: "absolute" }}
                        right={{ md: -100 }}
                        top={{ md: -200 }}
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
