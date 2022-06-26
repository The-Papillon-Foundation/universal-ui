import { Text } from "react-native";
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
    goNext: (id: string | null) => void;
    goIneligible: ({ message }: { message: string }) => void;
}

const Question = ({ card, group, goNext, goIneligible }: Props) => {
    const { setFinishedCardGroups } = useContext(WorkflowContext);
    const { updateSession } = useUpdateSession();

    const handleYesOrNoResponse = (response: "yes" | "no") => {
        updateSession({ [card.id]: response });
        if (response == "yes") {
            if (card.on_true == "exit") {
                goIneligible({ message: "" });
                return;
            }
            if (card.on_true == null) {
                setFinishedCardGroups((finishedCardGroups) => [
                    ...finishedCardGroups,
                    group.id,
                ]);
            }

            goNext(card.on_true);
        } else {
            if (card.on_false != "exit") {
                if (card.on_false == null) {
                    setFinishedCardGroups((finishedCardGroups) => [
                        ...finishedCardGroups,
                        group.id,
                    ]);
                }

                goNext(card.on_false);
            } else {
                goIneligible({
                    message: `Because you answered no on the previous question: \n${card.question.prompt}`,
                });
            }
        }
    };

    const handleTextInputResponse = (value: string | Date) => {
        if (value == "") return;
        updateSession({ [card.id]: value });

        // There are passing arguments and the value doesn't pass
        if (
            card.question.pass != undefined &&
            typeof value == "string" &&
            !card.question.pass.includes(value)
        ) {
            goIneligible({
                message: `The only valid answers to this question are: ${card.question.pass.join(
                    ", "
                )}`,
            });
            return;
        }
        if (card.on_true == null) {
            setFinishedCardGroups((finishedCardGroups) => [
                ...finishedCardGroups,
                group.id,
            ]);
        }
        goNext(card.on_true);
    };

    const handleMultipleChoiceResponse = (value: string) => {
        if (value == "") return;
        updateSession({ [card.id]: value });
        if (card.on_true == null) {
            setFinishedCardGroups((finishedCardGroups) => [
                ...finishedCardGroups,
                group.id,
            ]);
        }
        goNext(card.on_true);
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
