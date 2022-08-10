import React from "react";
import { Stack, useBreakpointValue, View } from "native-base";
import { DatePickerInput, DatePickerModal } from "react-native-paper-dates";
import QuestionPrompt from "./QuestionPrompt";
import QuestionButton from "./QuestionButton";
import { customTheme } from "../hooks/useCachedResources";
import { Button } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";

type Props = {
    prompt: string;
    handleResponse: (value: Date) => void;
};

const DateQuestion = ({ prompt, handleResponse }: Props) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
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
                <View w={{ base: "100%", md: "55%" }} flexDirection="row">
                    <DatePickerInput
                        locale="en"
                        value={date}
                        onChange={(d) => setDate(d)}
                        inputMode="start"
                        withModal={false}
                        withDateFormatInLabel={false}
                        style={{
                            backgroundColor: "transparent",
                            textAlign: "center",
                            height: 40,
                            justifyContent: "center",
                            fontSize: dateFontSize,
                        }}
                        mode="flat" //(see react-native-paper docs)
                        autoFocus
                        onSubmitEditing={submitDate}
                    />
                    <Fontisto
                        onPress={() => setOpen(true)}
                        name="date"
                        size={24}
                        color={customTheme.colors.about_text}
                    />
                </View>

                <QuestionButton onPress={submitDate}>Submit</QuestionButton>
            </Stack>
            <DatePickerModal
                locale="en"
                label="Select a date"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
            />
        </>
    );
};

export default DateQuestion;
