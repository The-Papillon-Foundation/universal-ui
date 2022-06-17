import { StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { QuestionStackParams } from "../screens/QuestionScreen";
import YesOrNoQuestion from "./YesOrNoQuestion";
import { StackNavigationProp } from "@react-navigation/stack";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TextInputQuestion from "./TextInputQuestion";
import QuestionContainer from "./QuestionContainer";
import { QuestionContext } from "../contexts/QuestionContext";

const Question = () => {
    const route = useRoute<RouteProp<QuestionStackParams, "Question">>();
    const navigation =
        useNavigation<StackNavigationProp<QuestionStackParams, "Question">>();
    const {
        params: { group, card },
    } = route;
    const { setFinishedCardGroups } = useContext(QuestionContext);

    const handleYesOrNoResponse = (response: "yes" | "no") => {
        if (response == "yes") {
            if (card.on_true == null) {
                setFinishedCardGroups((finishedCardGroups) => [
                    ...finishedCardGroups,
                    group.id,
                ]);
                navigation.navigate("Start");
                return;
            }
            const nextCardIndex = group.cards.findIndex(
                (c) => c.id == card.on_true
            );
            if (nextCardIndex == -1)
                throw new Error("Next card index out of scope.");
            navigation.push("Question", {
                card: group.cards[nextCardIndex],
                group,
            });
        } else {
            navigation.push("Ineligible", {
                message: `Because you answered no on the previous question: \n${card.question.prompt}`,
            });
        }
    };

    const handleTextInputResponse = (value: string) => {
        if (value == "") return;
        if (card.question.pass.includes(value.trim())) {
            if (card.on_true == null) {
                setFinishedCardGroups((finishedCardGroups) => [
                    ...finishedCardGroups,
                    group.id,
                ]);
                navigation.navigate("Start");
                return;
            }
            const nextCardIndex = group.cards.findIndex(
                (c) => c.id == card.on_true
            );
            if (nextCardIndex == -1)
                throw new Error("Next card index out of scope.");
            navigation.push("Question", {
                card: group.cards[nextCardIndex],
                group,
            });
        } else {
            navigation.push("Ineligible", {
                message: `You must live in one of the follow states to use this program: ${card.question.pass.join(
                    ", "
                )}`,
            });
        }
    };

    const handleMultipleChoiceResponse = (value: string) => {
        if (card.question.pass.includes(value)) {
            if (card.on_true == null) {
                setFinishedCardGroups((finishedCardGroups) => [
                    ...finishedCardGroups,
                    group.id,
                ]);
                navigation.navigate("Start");
                return;
            }
            const nextCardIndex = group.cards.findIndex(
                (c) => c.id == card.on_true
            );
            if (nextCardIndex == -1)
                throw new Error("Next card index out of scope.");
            navigation.push("Question", {
                card: group.cards[nextCardIndex],
                group,
            });
        } else {
            navigation.push("Ineligible", {
                message: `Because the only correct answers to the question: \n${
                    card.question.prompt
                }\nAre: ${card.question.pass.join(", ")}`,
            });
        }
    };

    const renderSwitch = () => {
        switch (card.question.type) {
            case "TrueOrFalse":
                return (
                    <YesOrNoQuestion
                        prompt={card.question.prompt}
                        handleResponse={handleYesOrNoResponse}
                    />
                );
            case "Address":
                return (
                    <TextInputQuestion
                        prompt={card.question.prompt}
                        handleResponse={handleTextInputResponse}
                    />
                );
            case "MultipleChoice":
                return (
                    <MultipleChoiceQuestion
                        prompt={card.question.prompt}
                        options={card.question.options}
                        handleResponse={handleMultipleChoiceResponse}
                    />
                );
            // case "MultiSelectQuestion":
            //     return (
            //         <MultiSelectQuestion
            //             place={params.place}
            //             prompt={params.prompt}
            //             options={params.options!}
            //             handleResponse={_handleResponse}
            //         />
            //     );
            default:
                return (
                    <Text>
                        Unable to find this type of question:{" "}
                        {card.question.type}
                    </Text>
                );
        }
    };
    return <QuestionContainer>{renderSwitch()}</QuestionContainer>;
};

export default Question;

const styles = StyleSheet.create({});
