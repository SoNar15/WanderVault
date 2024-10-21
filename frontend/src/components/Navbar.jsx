import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
                boxShadow="md"
                p={4}
            >
                <Text
                    fontSize={{ base: "22px", sm: "28px" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>WanderVault</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/add"}>
                        <Button aria-label="Add Destination" _hover={{ bg: "blue.500", color: "white" }}>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>
                    <Button aria-label="Toggle Color Mode" onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
