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
                padding: 24,
            }}
            onPress={onPress}
        >
            <View
                w={{ base: "100%", md: "350px" }}
                h={"220px"}
                backgroundColor={customTheme.colors.case_card_background}
                padding={"15px"}
                style={{
                    shadowColor: "#526971",
                    shadowOpacity: 0.2,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowRadius: 16,
                    zIndex: 100,
                }}
            >
                <StatusCard percentage={completion} />
                <View flexDirection={"row"}>
                    <View
                        my="7.5px"
                        width={`${Number(completion) * 100}%`}
                        borderWidth={
                            Number(completion) === 0 ? undefined : "1px"
                        }
                        borderLeftRadius={"30px"}
                        borderColor={customTheme.colors.case_horizontal_divider}
                    />
                    <View
                        my="7.5px"
                        width={`${100 - Number(completion) * 100}%`}
                        borderWidth={
                            Number(completion) >= 1 ? undefined : "1px"
                        }
                        borderRightRadius={"30px"}
                        borderColor={customTheme.colors.incomplete_status_bar}
                    />
                </View>

                {/* title */}
                <Text
                    fontFamily={"manrope-extrabold"}
                    style={{ width: "100%" }}
                    fontSize={"20px"}
                    lineHeight={"25px"}
                    color={"cyan.900"}
                    opacity={Number(completion) === 0 ? 0.6 : 1}
                    adjustsFontSizeToFit={true}
                >
                    {title}
                </Text>
                {children}
            </View>
        </TouchableOpacity>
    );
}
