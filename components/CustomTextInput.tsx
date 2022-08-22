import { View, Text } from "react-native";
import React from "react";
import { Input } from "native-base";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    ref?: React.RefObject<{
        focus: () => void;
    }>;
    value: string;
    onChangeText: (value: string) => void;
    onSubmitEditing: () => void;
    placeholder: string;
};

const CustomTextInput = ({
    ref,
    value,
    onChangeText,
    placeholder,
    onSubmitEditing,
}: Props) => {
    return (
        <Input
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            variant="underlined"
            placeholder={placeholder}
            fontFamily={"sf-pro"}
            fontSize={{ base: "md", md: "lg" }}
            placeholderTextColor={customTheme.colors.placeholder_question_text}
            onSubmitEditing={onSubmitEditing}
            w={{ base: "100%", md: "55%" }}
            autoFocus
        />
    );
};

export default CustomTextInput;
