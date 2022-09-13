import React, { useState } from "react";
import { CheckIcon, Select, Stack } from "native-base";
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
                <Select
                    selectedValue={value}
                    w={{ base: "100%", md: "50%" }}
                    accessibilityLabel="Select one."
                    placeholder="Select one."
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                    }}
                    mt={2}
                    onValueChange={(itemValue) => setValue(itemValue)}
                >
                    {options.map((option: string, index) => (
                        <Select.Item
                            key={index}
                            label={option}
                            value={option}
                        />
                    ))}
                </Select>
                <QuestionButton onPress={() => handleResponse(value)}>
                    Submit
                </QuestionButton>
            </Stack>
        </>
    );
};

export default MultipleChoiceQuestion;
