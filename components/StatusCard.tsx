import { Text, View } from "native-base";
import React from "react";
import { customTheme } from "../hooks/useCachedResources";

type Props = {};

const percentageToStatus = (percentage: number) =>
    percentage == 100.0
        ? "Completed"
        : percentage > 0.0
        ? "In Progress"
        : "Not Started";

const StatusCard = ({ percentage }: { percentage: number }) => (
    <View
        bgColor={
            percentage == 100
                ? customTheme.colors.complete_status_background
                : percentage > 0.0
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
                percentage == 100
                    ? customTheme.colors.complete_status_text
                    : customTheme.colors.incomplete_status_text
            }
        >
            {percentageToStatus(percentage)}
        </Text>
    </View>
);

export default StatusCard;
