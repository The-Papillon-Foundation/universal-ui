import React, { useState } from "react";
import { DatePickerInput, DatePickerModal } from "react-native-paper-dates";
import { FormControl, View } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    value: Date;
    onChange: (date: Date) => void;
    fontSize?: number;
    onSubmitEditing?: () => void;
    label?: string;
};

const CustomDatePicker = ({
    value,
    onChange,
    fontSize,
    onSubmitEditing,
    label,
}: Props) => {
    const [open, setOpen] = useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            onChange(params.date);
        },
        [setOpen]
    );
    return (
        <>
            <View width={{ base: "100%", md: "55%" }}>
                <FormControl>
                    {label && <FormControl.Label>{label}</FormControl.Label>}
                    <View flexDirection={"row"}>
                        <DatePickerInput
                            locale="en"
                            value={value}
                            onChange={(date: Date | undefined) =>
                                date && onChange(date)
                            }
                            inputMode="start"
                            withModal={false}
                            withDateFormatInLabel={false}
                            style={{
                                backgroundColor: "transparent",
                                textAlign: "left",
                                height: 40,
                                fontSize: fontSize,
                            }}
                            mode="flat" //(see react-native-paper docs)
                            autoFocus
                            onSubmitEditing={onSubmitEditing}
                        />
                        <Fontisto
                            onPress={() => setOpen(true)}
                            name="date"
                            size={24}
                            color={customTheme.colors.about_text}
                        />
                    </View>
                </FormControl>
            </View>
            <DatePickerModal
                locale="en"
                label="Select a date"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={value}
                onConfirm={onConfirmSingle}
            />
        </>
    );
};

export default CustomDatePicker;
