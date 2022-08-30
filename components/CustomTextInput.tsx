import React from "react";
import { FormControl, Input } from "native-base";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    innerRef?: React.RefObject<{
        focus: () => void;
    }>;
    label?: string;
    value: string;
    onChangeText: (value: string) => void;
    onSubmitEditing?: () => void;
    placeholder: string;
};

const CustomTextInput = ({
    innerRef,
    value,
    onChangeText,
    placeholder,
    onSubmitEditing,
    label,
}: Props) => {
    return (
        <FormControl>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <Input
                ref={innerRef}
                value={value}
                onChangeText={onChangeText}
                variant="underlined"
                placeholder={placeholder}
                fontFamily={"sf-pro"}
                fontSize={{ base: "md", md: "lg" }}
                placeholderTextColor={
                    customTheme.colors.placeholder_question_text
                }
                onSubmitEditing={onSubmitEditing}
                w={{ base: "100%", md: "55%" }}
                autoFocus
            />
        </FormControl>
    );
};

export default CustomTextInput;
