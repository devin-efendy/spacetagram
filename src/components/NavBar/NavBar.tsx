import { Flex, Text } from "@chakra-ui/react";

const NAVBAR_HEADLINE = "Spacetagram";

export const NavBar = () => {
  return (
    <Flex bg="gray.100" h="60px" align="center" justify="center">
      <Text textAlign="center" fontWeight="bold" as="h1" fontSize="20px">
        {NAVBAR_HEADLINE}
      </Text>
    </Flex>
  );
};
