/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl("/")],
    config: {
        screens: {
            Landing: "",
            DetermineWorkflow: "/determine-workflow",
            Home: "home",
            Questions: {
                path: "workflow",
                screens: {
                    Question: "question",
                    WorkflowLoading: "/",
                    ForceLogin: "force-login",
                    Ineligibility: "ineligibility",
                },
            },
            Modal: "modal",
            NotFound: "*",
        },
    },
};

export default linking;
