import { Text, View } from "native-base";
import React from "react";
import { customTheme } from "../hooks/useCachedResources";

const percentageToStatus = (percentage: string) =>
    Number(percentage) == 1.0
        ? "Completed"
        : Number(percentage) > 0.0
        ? "In Progress"
        : "Not Started";

const StatusCard = ({ percentage }: { percentage: string }) => (
    <View
        bgColor={
            Number(percentage) == 1.0
                ? customTheme.colors.complete_status_background
                : Number(percentage) > 0.0
                ? customTheme.colors.in_progress_status_background
                : customTheme.colors.not_started_status_background
        }
        alignSelf="flex-start"
        padding="4px"
        borderRadius={"2px"}
    >
        <Text
            fontFamily={"sf-pro-semibold"}
            fontSize="xs"
            color={
                Number(percentage) == 100
                    ? customTheme.colors.complete_status_text
                    : customTheme.colors.incomplete_status_text
            }
        >
            {percentageToStatus(percentage)}
        </Text>
    </View>
);

export default StatusCard;
