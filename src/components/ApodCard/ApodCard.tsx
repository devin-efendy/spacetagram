import { useState } from "react";
import { Box, Image, Flex, Button, Text, Icon } from "@chakra-ui/react";
import { format } from "date-fns";
import { ApodData } from "apod-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const ApodCard = ({
  copyright,
  date,
  title,
  url,
  explanation,
  id,
}: ApodData) => {
  const [isLiked, setIsLiked] = useState(false);
  const parsedDate = format(new Date(date), "MMM dd, yyyy");
  const renderCopyright = ` @ ${copyright}`;

  const likeButtonBg = isLiked ? "pink.100" : "none";

  return (
    <Box
      d="inline-block"
      borderWidth="1px"
      borderRadius="xl"
      w="100%"
      mb="5"
      overflow="hidden"
    >
      <Image src={url} alt={title} />
      <Box p="4">
        <Text mt="1" fontWeight="bold" as="h2" isTruncated>
          {title}
        </Text>
        <Text mb="3" fontWeight="semibold" as="h4" color="gray.500">
          {parsedDate}
          {copyright && <>{renderCopyright}</>}
        </Text>

        <Text as="body" fontSize={14}>
          {explanation}
        </Text>

        <Flex mt="6">
          <Button
            mr="4"
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="md"
            bg={likeButtonBg}
            color="gray.600"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked && <FontAwesomeIcon icon={faHeart} color="red" />}
            {!isLiked && <Text ml="0">Like</Text>}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
