import { Text, View } from "native-base";
import React from "react";

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
                ? "#A7F3D0"
                : Number(percentage) > 0.0
                ? "#BAE6FD"
                : "coolGray.200"
        }
        alignSelf="flex-start"
        alignItems={"center"}
        justifyContent="center"
        height="16px"
        width={"59px"}
        borderRadius={"2px"}
    >
        <Text
            fontFamily={"sf-pro-semibold"}
            fontSize="8px"
            color={
                Number(percentage) == 1.0
                    ? "#059669"
                    : Number(percentage) > 0.0
                    ? "#0284C7"
                    : "coolGray.600"
            }
        >
            {percentageToStatus(percentage)}
        </Text>
    </View>
);

export default StatusCard;
