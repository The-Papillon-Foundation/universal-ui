import React, { useState } from "react";
import { Radio, Stack } from "native-base";
import QuestionButton from "./QuestionButton";
import QuestionHeader from "./QuestionHeader";

type Props = {
    prompt: string;
    help?: string;
    options: string[];
    handleResponse: (value: string) => void;
};

const MultipleChoiceQuestion = ({
    prompt,
    help,
    options,
    handleResponse,
}: Props) => {
    const [value, setValue] = useState<string>("");

    return (
        <>
            <QuestionHeader prompt={prompt} help={help} />
            <Stack space="2.5" mt="2">
                <Radio.Group
                    name={prompt}
                    accessibilityLabel={prompt}
                    value={value}
                    onChange={(nextValue) => setValue(nextValue)}
                >
                    {options.map((option, index) => (
                        <Radio
                            accessibilityLabel={option}
                            key={option + index}
                            value={option}
                            my={1}
                        >
                            {option}
                        </Radio>
                    ))}
                </Radio.Group>
                <QuestionButton onPress={() => handleResponse(value)}>
                    Submit
                </QuestionButton>
            </Stack>
        </>
    );
};

export default MultipleChoiceQuestion;
