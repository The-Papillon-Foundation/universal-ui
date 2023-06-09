import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "native-base";
import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { customAssets, customTheme } from "../hooks/useCachedResources";
import { useLogin } from "../hooks/useLogin";
import { RootStackParamList } from "../types";

type Props = {};

const HomeNavBar = (props: Props) => {
    const { logout } = useLogin();
    const navigation =
        useNavigation<NavigationProp<RootStackParamList, "Home">>();
    const { userId } = useContext(GlobalContext);
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
            }}
            paddingY={{ base: "20px", md: "20px" }}
            paddingX={{ base: "25px", md: "50px" }}
            backgroundColor={customTheme.colors.home_screen_navbar_background}
        >
            <View flexDirection={"row"} alignItems="center">
                <Text
                    color={customTheme.colors.home_screen_navbar_title}
                    fontFamily={"manrope-semibold"}
                    fontSize="2xl"
                >
                    Hello, {userId}.
                </Text>
                <Text
                    ml="20px"
                    fontFamily={"sf-pro-medium"}
                    fontSize={{ base: "sm", md: "lg" }}
                    color={customTheme.colors.home_screen_navbar_item}
                    onPress={() => {
                        logout();
                        navigation.navigate("Landing");
                    }}
                    textDecorationLine="underline"
                >
                    Logout
                </Text>
            </View>
            <View>
                <Image
                    source={{ uri: customAssets.image_urls.logo as string }}
                    width={{ base: 50, md: 75 }}
                    height={undefined}
                    style={{ aspectRatio: 1 }}
                    alt={"Company logo"}
                />
            </View>
        </View>
    );
};

export default HomeNavBar;
