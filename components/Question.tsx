import { Text } from "react-native";
import React, { ComponentType } from "react";
import YesOrNoQuestion from "./YesOrNoQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TextInputQuestion from "./TextInputQuestion";
import { useUpdateSession } from "../hooks/useUpdateSession";
import { QuestionCard, QuestionGroup } from "../types";
import DateQuestion from "./DateQuestion";
import AddressQuestion, { AddressFieldObject } from "./AddressQuestion";
import InfoCard from "./InfoCard";
import TrueOrFalseQuestion from "./TrueOrFalseQuestion";
import PhoneNumberQuestion from "./PhoneNumberQuestion";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import ErrorBoundaryScreen from "../screens/ErrorBoundaryScreen";
import DollarAmountQuestion from "./DollarAmountQuestion";
import SocialSecurityNumberQuestion from "./SocialSecurityNumberQuestion";

interface Props {
    card: QuestionCard;
    group: QuestionGroup;
    goNext: (id: string | null) => void;
    goIneligible: ({ message }: { message: string }) => void;
    onFinish: () => void;
}

const Question = ({ card, group, goNext, goIneligible, onFinish }: Props) => {
    const { updateSession } = useUpdateSession();

    const handleYesOrNoResponse = (response: boolean) => {
        updateSession(card.id, response);
        if (response == true) {
            if (card.on_true == "exit") {
                goIneligible({ message: "" });
                return;
            }

            goNext(card.on_true);
        } else {
            if (card.on_false != "exit") {
                goNext(card.on_false);
            } else {
                updateSession(card.id, { exit: response });
                goIneligible({
                    message: `Because you answered no on the previous question: \n${
                        card.question!.prompt
                    }`,
                });
            }
        }
    };

    const handleTrueOrFalseResponse = (response: boolean) => {
        updateSession(card.id, response);
        if (response == true) {
            if (card.on_true == "exit") {
                updateSession(card.id, { exit: response });
                goIneligible({
                    message: `Because you answered true on the previous question: \n${
                        card.question!.prompt
                    }`,
                });
                return;
            }

            goNext(card.on_true);
        } else {
            if (card.on_false != "exit") {
                goNext(card.on_false);
            } else {
                updateSession(card.id, { exit: response });
                goIneligible({
                    message: `Because you answered false on the previous question: \n${
                        card.question!.prompt
                    }`,
                });
            }
        }
    };

    const handleAddressResponse = (addressFieldObject: AddressFieldObject) => {
        // input is already validated
        updateSession(card.id, addressFieldObject);
        goNext(card.on_true);
    };

    const handlePhoneNumberResponse = (value: string) => {
        if (value == "") return;
        updateSession(card.id, value);
        goNext(card.on_true);
    };

    const handleDateSubmissionResponse = (value: Date) => {
        updateSession(card.id, value);
        goNext(card.on_true);
    };

    const handleSocialSecurityNumberQuestion = (value: string) => {
        updateSession(card.id, value);
        goNext(card.on_true);
    };

    const handleTextInputResponse = (value: string) => {
        if (!card.question || card.question.type != "Text") return;
        if (value == "") return;
        updateSession(card.id, value);

        // There are passing arguments and the value doesn't pass
        if (
            typeof value != "object" &&
            card.question.pass != undefined &&
            !card.question!.pass.includes(value)
        ) {
            updateSession(card.id, { exit: value });
            goIneligible({
                message: `The only valid answers to this question are: ${card.question!.pass.join(
                    ", "
                )}`,
            });
            return;
        }
        goNext(card.on_true);
    };

    const handleDollarAmountResponse = (value: string) => {
        if (value == "") return;
        updateSession(card.id, value);
        goNext(card.on_true);
    };

    const handleMultipleChoiceResponse = (value: string) => {
        if (
            value == "" ||
            !card.question ||
            card.question.type != "MultipleChoice"
        )
            return;

        updateSession(card.id, value);
        if (!card.question.pass) return goNext(card.on_true);

        // if there is a pass array
        if (card.question.pass.includes(value)) {
            if (card.on_true != "exit") {
                return goNext(card.on_true);
            } else {
                updateSession(card.id, { exit: value });
                return goIneligible({
                    message: `Because you answered ${value} on the previous question: \n${
                        card.question!.prompt
                    }`,
                });
            }
        } else {
            if (card.on_false != "exit") {
                return goNext(card.on_false);
            } else {
                updateSession(card.id, { exit: value });
                return goIneligible({
                    message: `Because you answered ${value} on the previous question: \n${
                        card.question!.prompt
                    }`,
                });
            }
        }
    };

    const handleInfoCardResponse = () => {
        goNext(card.next!);
    };

    const renderSwitch = () => {
        if (!card.question) {
            if (!card.text) return;
            return (
                <InfoCard
                    text={card.text}
                    subtext={card.subtext}
                    buttonText={card.button_text}
                    handleResponse={handleInfoCardResponse}
                />
            );
        }
        try {
            switch (card.question.type) {
                case "YesOrNo":
                    return (
                        <YesOrNoQuestion
                            prompt={card.question.prompt}
                            help={card.question.help}
                            handleResponse={handleYesOrNoResponse}
                        />
                    );
                case "TrueOrFalse":
                    return (
                        <TrueOrFalseQuestion
                            prompt={card.question.prompt}
                            help={card.question.help}
                            handleResponse={handleTrueOrFalseResponse}
                        />
                    );
                case "Address":
                    return (
                        <AddressQuestion
                            prompt={card.question.prompt}
                            help={card.question.help}
                            handleResponse={handleAddressResponse}
                        />
                    );
                case "Text":
                    return (
                        <TextInputQuestion
                            prompt={card.question.prompt}
                            help={card.question.help}
                            handleResponse={handleTextInputResponse}
                        />
                    );
                case "DollarAmount":
                    return (
                        <DollarAmountQuestion
                            prompt={card.question.prompt}
                            help={card.question.help}
                            handleResponse={handleDollarAmountResponse}
                        />
                    );
                case "PhoneNumber":
                    return (
                        <PhoneNumberQuestion
                            prompt={card.question.prompt}
                            help={card.question.help}
                            handleResponse={handlePhoneNumberResponse}
                        />
                    );
                case "Date":
                    return (
                        <DateQuestion
                            prompt={card.question.prompt}
                            help={card.question.help}
                            handleResponse={handleDateSubmissionResponse}
                        />
                    );
                case "MultipleChoice":
                    return (
                        <MultipleChoiceQuestion
                            prompt={card.question.prompt}
                            help={card.question.help}
                            options={card.question.options}
                            handleResponse={handleMultipleChoiceResponse}
                        />
                    );
                case "SocialSecurityNumber":
                    return (
                        <SocialSecurityNumberQuestion
                            prompt={card.question.prompt}
                            help={card.question.help}
                            handleResponse={handleSocialSecurityNumberQuestion}
                        />
                    );
                default:
                    return (
                        <Text>
                            Unable to find this type of question:
                            {card.id}
                        </Text>
                    );
            }
        } catch (error) {
            return null;
        }
    };
    return (
        <ErrorBoundary
            FallbackComponent={
                ErrorBoundaryScreen as ComponentType<FallbackProps>
            }
        >
            {renderSwitch() || <Text>Error</Text>}
        </ErrorBoundary>
    );
};

export default Question;
