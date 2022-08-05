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
            Loading: "",
            Landing: "landing",
            DetermineWorkflow: "determine-workflow",
            Eligibility: "eligibility",
            CreateUser: "create-user",
            Login: "login",
            Process: "process",
            Home: "home",
            Case: "case",
            Ineligible: "ineligible",
            Review: "review",
            Debug: "debug",
            Modal: "modal",
            NotFound: "*",
        },
    },
};

export default linking;
