import React from "react";
import { Stack, useBreakpointValue, View } from "native-base";
import { DatePickerInput, DatePickerModal } from "react-native-paper-dates";
import QuestionPrompt from "./QuestionPrompt";
import QuestionButton from "./QuestionButton";
import { customTheme } from "../hooks/useCachedResources";
import { Button } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
import CustomDatePicker from "./CustomDatePicker";

type Props = {
    prompt: string;
    handleResponse: (value: Date) => void;
};

const DateQuestion = ({ prompt, handleResponse }: Props) => {
    const [date, setDate] = React.useState<Date>(new Date());
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
        },
        [setOpen, setDate]
    );
    const dateFontSize = useBreakpointValue({
        base: 18,
        md: 20,
    });

    const submitDate = () => {
        date && handleResponse(date);
        setDate(new Date());
    };
    return (
        <>
            <QuestionPrompt>{prompt}</QuestionPrompt>
            <Stack space="2.5" mt="2">
                <View w={{ base: "90%", md: "55%" }} flexDirection="row">
                    <CustomDatePicker
                        value={date}
                        onChange={(d: Date | undefined) => d && setDate(d)}
                        onSubmitEditing={submitDate}
                    />
                </View>

                <QuestionButton onPress={submitDate}>Submit</QuestionButton>
            </Stack>
        </>
    );
};

export default DateQuestion;
