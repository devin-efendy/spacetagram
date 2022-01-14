import { Flex, Text, Center, Box } from "@chakra-ui/react";

const NAVBAR_HEADLINE = "Spacetagram";

export const NavBar = () => {
  return (
    <Flex bg="blue.50" h="50" align="center" justify="center">
      <Text textAlign="center">{NAVBAR_HEADLINE}</Text>
    </Flex>
  );
};
