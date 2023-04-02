import { Button, Text } from "native-base";
import React from "react";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    onPress: () => void;
    children: React.ReactNode;
    isLoading?: boolean;
    inverted?: boolean;
    inactive?: boolean;
};

const QuestionButton = ({
    onPress,
    children,
    isLoading = false,
    inverted = false,
    inactive = false,
}: Props) => {
    return (
        <Button
            isLoading={isLoading}
            isDisabled={inactive}
            bgColor={
                inverted
                    ? "white"
                    : inactive
                    ? "trueGray.400"
                    : customTheme.colors.button_surface
            }
            borderColor={customTheme.colors.button_surface}
            borderWidth={inactive || !inverted ? undefined : "2px"}
            color={"white"}
            onPress={onPress}
            borderRadius={4}
            flex={1}
            minH={"45px"}
            w={{ base: "100%", md: "200px" }}
        >
            <Text
                fontFamily={"sf-pro-medium"}
                color={inverted ? customTheme.colors.button_surface : "white"}
                fontSize={"16px"}
            >
                {children}
            </Text>
        </Button>
    );
};

export default QuestionButton;
