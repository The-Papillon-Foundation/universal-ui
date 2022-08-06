import { Text, useBreakpointValue, View } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { customTheme } from "../hooks/useCachedResources";
import StatusCard from "./StatusCard";

type Props = {
    children?: React.ReactNode;
    onPress: () => void;
    completion: string;
    title: string;
};

export default function CaseCard({
    children,
    onPress,
    completion,
    title,
}: Props) {
    const screenSize = useBreakpointValue({
        base: "base",
        md: "md",
    });
    return (
        <TouchableOpacity
            style={{
                marginBottom: screenSize == "base" ? 15 : 0,
                flex: 1,
            }}
            onPress={onPress}
        >
            <View
                borderColor={customTheme.colors.case_card_border}
                borderWidth={"2px"}
                borderRadius={"32px"}
                w={{ base: "100%", md: "350px" }}
                h={"200px"}
                backgroundColor={customTheme.colors.case_card_background}
                padding={"15px"}
            >
                <StatusCard percentage={completion} />
                <View
                    my="7.5px"
                    borderWidth={"1px"}
                    borderRadius={"30px"}
                    borderColor={customTheme.colors.case_horizontal_divider}
                />
                {/* title */}
                <Text
                    fontFamily={"poppins-bold"}
                    fontSize="xl"
                    color={customTheme.colors.case_card_title}
                    noOfLines={1}
                    adjustsFontSizeToFit={true}
                >
                    {title}
                </Text>
                {children}
            </View>
        </TouchableOpacity>
    );
}
