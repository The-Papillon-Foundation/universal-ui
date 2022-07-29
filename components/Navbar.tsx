import React, { useState } from "react";
import {
    CloseIcon,
    Divider,
    HamburgerIcon,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    View,
    VStack,
} from "native-base";
import { Platform, TouchableOpacity, Linking, Animated } from "react-native";
import { customAssets, customTheme } from "../hooks/useCachedResources";
import { useNavigation } from "@react-navigation/native";
import { useSpring, animated } from "react-spring";

type Props = {};

const navbar_options = [
    { title: "Home", route: "Home" },
    { title: "Abouts", url: "https://www.papillonfoundation.org/about" },
    {
        title: "Resources",
        url: "https://www.papillonfoundation.org/criminal-record-resources",
    },
];

const NavbarButton = ({
    onPress,
    children,
    isMobile = false,
}: {
    onPress: () => void;
    isMobile?: boolean;
    children: React.ReactNode;
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text
                color={
                    isMobile
                        ? customTheme.colors.mobile_navbar_button
                        : customTheme.colors.navbar_button
                }
                fontFamily={"poppins-medium"}
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const Navbar = (props: Props) => {
    const AnimatedView = animated(View);
    const screenSize = useBreakpointValue({
        base: "base",
        md: "md",
    });
    const navigation = useNavigation();
    const [expanded, setExpanded] = useState(false);
    const [mobileMenuButtonProps, api] = useSpring(() => ({ height: "0%" }));

    return (
        <>
            <HStack
                px={{ base: "15px", md: 35 }}
                paddingTop={{
                    base: Platform.OS == "web" ? "15px" : "40px",
                    md: 35,
                }}
                paddingBottom={{ base: "15px", md: "15px" }}
                justifyContent={"space-between"}
                alignItems="center"
            >
                <HStack alignItems={"center"}>
                    <Image
                        source={{ uri: customAssets.image_urls.logo as string }}
                        width={{ base: 78, md: 118 }}
                        height={undefined}
                        style={{ aspectRatio: 1 }}
                        alt={"Company logo"}
                    />

                    {screenSize == "md" && (
                        <View marginLeft={5} maxW={250}>
                            <Heading
                                color={customTheme.colors.org_name_heading}
                                fontFamily={"poppins-bold"}
                                fontSize={{ base: "sm", md: 30, lg: 38 }}
                            >
                                {customAssets.copy.organization_name}
                            </Heading>
                        </View>
                    )}
                </HStack>
                {screenSize == "base" && (
                    <View
                        alignItems={"center"}
                        display={{ base: "flex", md: "none" }}
                        w={{ base: "auto", md: 0 }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                setExpanded((e) => {
                                    const newE = !e;

                                    api.stop();
                                    api.start({ height: newE ? "30%" : "0%" });

                                    return newE;
                                })
                            }
                        >
                            {!expanded ? (
                                <HamburgerIcon
                                    color={customTheme.colors.hamburger}
                                    size={25}
                                />
                            ) : (
                                <CloseIcon
                                    color={customTheme.colors.hamburger}
                                    size={25}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
                {screenSize == "md" && (
                    <Stack
                        direction={"row"}
                        display={{ base: "none", md: "flex" }}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                        space={4}
                    >
                        {navbar_options.map((nb) => (
                            <NavbarButton
                                key={nb.title}
                                onPress={() => {
                                    if (nb.route) {
                                        navigation.navigate(nb.route as "Home");
                                    } else if (nb.url) {
                                        Linking.canOpenURL(nb.url).then(
                                            (supported) => {
                                                return Linking.openURL(nb.url);
                                            }
                                        );
                                    }
                                }}
                            >
                                {nb.title}
                            </NavbarButton>
                        ))}
                    </Stack>
                )}
            </HStack>
            {screenSize == "base" && (
                <AnimatedView style={{ ...mobileMenuButtonProps }}>
                    {expanded && (
                        <VStack
                            alignItems={"center"}
                            divider={<Divider w={"75%"} />}
                            space={"16px"}
                            my={"16px"}
                            h={"20%"}
                        >
                            {navbar_options.map((nb) => (
                                <NavbarButton
                                    key={nb.title}
                                    isMobile
                                    onPress={() => {
                                        if (nb.route) {
                                            navigation.navigate(
                                                nb.route as "Home"
                                            );
                                        } else if (nb.url) {
                                            Linking.canOpenURL(nb.url).then(
                                                (supported) => {
                                                    return Linking.openURL(
                                                        nb.url
                                                    );
                                                }
                                            );
                                        }
                                    }}
                                >
                                    {nb.title}
                                </NavbarButton>
                            ))}
                        </VStack>
                    )}
                </AnimatedView>
            )}
        </>
    );
};

export default Navbar;
