import { QuestionIcon, View } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import HelpText from "./HelpText";
import QuestionPrompt from "./QuestionPrompt";

type Props = {
    prompt: string;
    help?: string;
};

const QuestionHeader = ({ prompt, help }: Props) => {
    const [showingHelpText, setShowingHelpText] = useState(false);

    const toggleHelpText = () => {
        setShowingHelpText((ssht) => !ssht);
    };

    useEffect(() => {
        setShowingHelpText(false);
    }, [prompt]);
    return (
        <>
            <View
                flexDirection={"row"}
                alignItems="center"
                justifyContent={"space-between"}
            >
                <QuestionPrompt>{prompt}</QuestionPrompt>
                {help != undefined && help != "" && (
                    <TouchableOpacity onPress={toggleHelpText}>
                        <QuestionIcon
                            color={showingHelpText ? "muted.600" : "muted.200"}
                            ml="15px"
                            size={"24px"}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {showingHelpText && <HelpText>{help}</HelpText>}
        </>
    );
};

export default QuestionHeader;
