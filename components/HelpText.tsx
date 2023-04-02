import { Text } from "native-base";
import React from "react";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    children: React.ReactNode;
};

const HelpText = ({ children }: Props) => {
    return (
        <Text
            fontFamily={customTheme.fonts.body}
            color={"muted.400"}
            fontSize={{ base: "md", md: "lg" }}
        >
            {children}
        </Text>
    );
};

export default HelpText;
