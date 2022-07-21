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
import AddressQuestion, { AddressFieldObject } from "./AddressQuestion";

interface Props {
    card: QuestionCard;
    group: QuestionGroup;
    goNext: (id: string | null) => void;
    goIneligible: ({ message }: { message: string }) => void;
    onFinish: () => void;
}

const Question = ({ card, group, goNext, goIneligible, onFinish }: Props) => {
    const { setFinishedCardGroups } = useContext(WorkflowContext);
    const { updateSession } = useUpdateSession();

    const handleYesOrNoResponse = (response: "yes" | "no") => {
        updateSession({ [card.id]: response });
        if (response == "yes") {
            if (card.on_true == "exit") {
                goIneligible({ message: "" });
                return;
            }

            goNext(card.on_true);
        } else {
            if (card.on_false != "exit") {
                goNext(card.on_false);
            } else {
                goIneligible({
                    message: `Because you answered no on the previous question: \n${card.question.prompt}`,
                });
            }
        }
    };

    const handleAddressResponse = (addressFieldObject: AddressFieldObject) => {
        // input is already validated
        updateSession({ [card.id]: addressFieldObject });
        goNext(card.on_true);
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
        goNext(card.on_true);
    };

    const handleMultipleChoiceResponse = (value: string) => {
        if (value == "") return;
        updateSession({ [card.id]: value });
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
                        <AddressQuestion
                            prompt={card.question.prompt}
                            handleResponse={handleAddressResponse}
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
