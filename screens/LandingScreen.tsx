import React, { useContext } from "react";
import { Button, Heading, Image, Stack, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { GlobalContext } from "../contexts/GlobalContext";
import { customAssets, customTheme } from "../hooks/useCachedResources";
import { useWindowDimensions } from "react-native";

const LandingScreen = () => {
    const { sessionId } = useContext(GlobalContext);
    const { height, width: deviceWidth } = useWindowDimensions();
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList, "Landing">>();

    const navigateToLogin = () => {
        navigation.push("Login");
    };

    const navigateToDetermineWorkflowScreen = () => {
        navigation.push("DetermineWorkflow");
    };
    return (
        <View
            flex={1}
            bgColor={customTheme.colors.landing_page_background}
            justifyContent={"center"}
            alignItems="center"
        >
            <View w={{ base: "85%", md: "44%" }} minW={200}>
                <Image
                    source={{ uri: customAssets.image_urls.logo as string }}
                    alt={"logo image"}
                    width={{ base: 175, md: 214 }}
                    height={undefined}
                    style={{ aspectRatio: 1 }}
                    alignSelf={{ base: "center", md: "start" }}
                />
                <View my={"2.5%"} />
                <Text
                    color={customTheme.colors.about_text}
                    fontSize={{
                        base: "xs",
                        md: "sm",
                        lg: "md",
                    }}
                    textAlign={{
                        base: "center",
                        md: "left",
                    }}
                    fontFamily={"sf-pro-medium"}
                >
                    This app guides you through the expungement process.
                </Text>
                <Heading
                    color={customTheme.colors.greeting_text}
                    fontSize={{
                        base: "xl",
                        md: "3xl",
                        lg: "4xl",
                    }}
                    textAlign={{
                        base: "center",
                        md: "left",
                    }}
                    fontFamily={"sf-pro-bold"}
                >
                    Let's get started
                </Heading>
                <View my={"2.5%"} />
                <Stack
                    direction={{ base: "column", md: "row", lg: "row" }}
                    w={"100%"}
                    h={{ base: "25%", md: "12%" }}
                    space={{ base: 3, md: 5 }}
                    justifyContent={"space-between"}
                >
                    <Button
                        flex={1}
                        color={"white"}
                        bgColor={customTheme.colors.login_button_surface}
                        onPress={navigateToLogin}
                    >
                        Login
                    </Button>
                    <Button
                        flex={1}
                        color={"white"}
                        bgColor={customTheme.colors.signup_button_surface}
                        onPress={navigateToDetermineWorkflowScreen}
                    >
                        Get Started
                    </Button>
                </Stack>
            </View>
            <View position={"absolute"} bottom={5} maxW={"85%"}>
                <Text color={"warmGray.400"} fontSize={12}>
                    Copyright © 2022· The Papillon Foundation. By using this
                    site, you agree to the Terms and Privacy Policy.
                </Text>
            </View>
        </View>
    );
};

export default LandingScreen;
