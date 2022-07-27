import { Button } from "native-base";
import React from "react";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    onPress: () => void;
    children: React.ReactNode;
    isLoading?: boolean;
};

const QuestionButton = ({ onPress, children, isLoading = false }: Props) => {
    return (
        <Button
            isLoading={isLoading}
            bgColor={customTheme.colors.button_surface}
            color={"white"}
            onPress={onPress}
            borderRadius={4}
        >
            {children}
        </Button>
    );
};

export default QuestionButton;
