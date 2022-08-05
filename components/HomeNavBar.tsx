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
    const { sessionId, userId, checkedForSession } = useContext(GlobalContext);
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 50,
                paddingVertical: 20,
            }}
            backgroundColor={customTheme.colors.home_screen_navbar_background}
            borderBottomRadius={"40px"}
        >
            <View flexDirection={"row"} alignItems="center">
                <Text
                    color={customTheme.colors.home_screen_navbar_title}
                    fontFamily={"sf-pro-bold"}
                    fontSize="2xl"
                >
                    Hello, {userId}.
                </Text>
                <Text
                    ml="20px"
                    fontFamily={"sf-pro-medium"}
                    fontSize={"lg"}
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
