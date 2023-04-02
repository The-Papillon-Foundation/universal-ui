import React from "react";
import { Checkbox } from "native-base";
import QuestionContainer from "./QuestionContainer";
import QuestionButton from "./QuestionButton";
import QuestionHeader from "./QuestionHeader";

type Props = {
    prompt: string;
    help: string;
    options: string[];
    handleResponse: () => void;
};

const MultiSelectQuestion = ({
    prompt,
    help,
    options,
    handleResponse,
}: Props) => {
    return (
        <QuestionContainer>
            <QuestionHeader prompt={prompt} help={help} />

            <Checkbox.Group accessibilityLabel="multi-select">
                {options.map((option) => (
                    <Checkbox
                        colorScheme={"multi-select-active"}
                        m={2}
                        key={option}
                        value={option}
                        _text={{ color: "black" }}
                    >
                        {option}
                    </Checkbox>
                ))}
            </Checkbox.Group>
            <QuestionButton onPress={() => handleResponse()}>
                Submit
            </QuestionButton>
        </QuestionContainer>
    );
};

export default MultiSelectQuestion;
