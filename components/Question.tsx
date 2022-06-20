import { StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import YesOrNoQuestion from "./YesOrNoQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TextInputQuestion from "./TextInputQuestion";
import QuestionContainer from "./QuestionContainer";
import { useUpdateSession } from "../hooks/useUpdateSession";
import { WorkflowContext } from "../contexts/WorkflowContext";
import { QuestionCard, QuestionGroup } from "../types";
import DateQuestion from "./DateQuestion";

interface Props {
    card: QuestionCard;
    group: QuestionGroup;
    goNext: () => void;
    goIneligible: ({ message }: { message: string }) => void;
}

const Question = ({ card, group, goNext, goIneligible }: Props) => {
    const { setFinishedCardGroups } = useContext(WorkflowContext);
    const { updateSession } = useUpdateSession();

    const handleYesOrNoResponse = (response: "yes" | "no") => {
        updateSession({ [card.id]: response });
        if (response == "yes") {
            if (card.on_true == null) {
                setFinishedCardGroups((finishedCardGroups) => [
                    ...finishedCardGroups,
                    group.id,
                ]);
                return;
            }
            goNext();
        } else {
            goIneligible({
                message: `Because you answered no on the previous question: \n${card.question.prompt}`,
            });
        }
    };

    const handleTextInputResponse = (value: string | Date) => {
        if (value == "") return;
        updateSession({ [card.id]: value });

        if (card.on_true == null) {
            setFinishedCardGroups((finishedCardGroups) => [
                ...finishedCardGroups,
                group.id,
            ]);
            return;
        }
        goNext();
    };

    const handleMultipleChoiceResponse = (value: string) => {
        if (value == "") return;
        updateSession({ [card.id]: value });
        if (card.question.pass.includes(value)) {
            if (card.on_true == null) {
                setFinishedCardGroups((finishedCardGroups) => [
                    ...finishedCardGroups,
                    group.id,
                ]);
                return;
            }
            goNext();
        } else {
            goIneligible({
                message: `Because the only correct answers to the question: \n${
                    card.question.prompt
                }\nAre: ${card.question.pass.join(", ")}`,
            });
        }
    };

    const renderSwitch = () => {
        try {
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
                case "Text":
                    return (
                        <TextInputQuestion
                            prompt={card.question.prompt}
                            handleResponse={handleTextInputResponse}
                        />
                    );
                case "Date":
                    return (
                        <DateQuestion
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
                default:
                    return (
                        <Text>
                            Unable to find this type of question:{" "}
                            {card.question.type}
                        </Text>
                    );
            }
        } catch (error) {
            return null;
        }
    };
    return (
        <QuestionContainer>
            {renderSwitch() || <Text>Error</Text>}
        </QuestionContainer>
    );
};

export default Question;

const styles = StyleSheet.create({});
