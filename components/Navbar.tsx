import React from "react";
import {
    HamburgerIcon,
    Heading,
    HStack,
    Image,
    Text,
    useBreakpointValue,
    View,
} from "native-base";
import { Platform, TouchableOpacity } from "react-native";
import { customAssets, customTheme } from "../hooks/useCachedResources";

type Props = {};

const NavbarButton = ({
    onPress,
    children,
}: {
    onPress: () => void;
    children: React.ReactNode;
}) => {
    return (
        <TouchableOpacity>
            <Text
                color={customTheme.colors.navbar_button}
                fontFamily={"poppins-medium"}
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const Navbar = (props: Props) => {
    const screenSize = useBreakpointValue({
        base: "base",
        md: "md",
    });
    return (
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
                    <HamburgerIcon
                        color={customTheme.colors.hamburger}
                        size={25}
                    />
                </View>
            )}
            {screenSize == "md" && (
                <HStack
                    display={{ base: "none", md: "flex" }}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    space={4}
                >
                    <NavbarButton onPress={() => {}}>Home</NavbarButton>
                    <NavbarButton onPress={() => {}}>Log in</NavbarButton>
                    <NavbarButton onPress={() => {}}>Sign up</NavbarButton>
                    <NavbarButton onPress={() => {}}>About</NavbarButton>
                    <NavbarButton onPress={() => {}}>Resources</NavbarButton>
                </HStack>
            )}
        </HStack>
    );
};

export default Navbar;
