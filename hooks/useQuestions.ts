import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { QuestionStackParams } from "../screens/QuestionScreen";

const steps = [
    {
        prompt: "Are you colorblind? Color blindness occurs when you are unable to see colors in a normal way. It is also known as color deficiency. Color blindness often happens when someone cannot distinguish between certain colors. This usually happens between greens and reds, and occasionally blues.",
        type: "YesOrNo",
    },
    {
        prompt: "What is your date of birth",
        type: "DateSelection",
    },
    {
        prompt: "What do you have? Click all that apply.",
        type: "MultiSelectQuestion",
        options: ["Dog", "Cat", "Fish"],
    },
];

export const useQuestions = () => {
    const [step, setStep] = useState(steps[0]);
    const [place, setPlace] = useState(0);
    const navigation =
        useNavigation<
            NativeStackNavigationProp<QuestionStackParams, "Question">
        >();

    const nextStep = () => {
        let newPlace, newStep;
        if (place < steps.length - 1) {
            newPlace = place + 1;
            newStep = steps[newPlace];
        } else {
            newPlace = 0;
            newStep = steps[newPlace];
        }
        setStep(newStep);
        setPlace(newPlace);
        navigation.push("Question", {
            place: newPlace,
            prompt: newStep.prompt,
            type: newStep.type,
            options: newStep.options,
        });
    };
    return {
        nextStep,
    };
};
