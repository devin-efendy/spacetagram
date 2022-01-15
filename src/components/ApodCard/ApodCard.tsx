import { useState } from "react";
import { useCookies } from "react-cookie";
import { Box, Image, Flex, Button, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ApodData } from "apod-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

function handleUserCookie(
  apodId: string,
  isLiked: boolean,
  cookies: any,
  setCookie: any
): void {
  let userCookie;

  if (cookies?.user) {
    let updatedLikedPictures;
    const { id, apodLikedPictures } = cookies.user;

    if (isLiked) {
      updatedLikedPictures = apodLikedPictures.filter(
        (picId: string) => picId !== apodId
      );
    } else {
      updatedLikedPictures = [...apodLikedPictures, apodId];
    }

    userCookie = {
      id,
      apodLikedPictures: updatedLikedPictures,
    };
  } else {
    userCookie = {
      id: uuidv4(),
      apodLikedPictures: [apodId],
    };
  }

  setCookie("user", JSON.stringify(userCookie), {
    path: "/",
    maxAge: 3600,
    sameSite: true,
  });
}

export const ApodCard = ({
  copyright,
  date,
  title,
  url,
  explanation,
  isLikedCookie,
}: ApodData) => {
  const [isLiked, setIsLiked] = useState(isLikedCookie);
  const [cookies, setCookie] = useCookies(["user"]);
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

        <Text as="p" fontSize={14}>
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
            onClick={() => {
              handleUserCookie(date, isLiked, cookies, setCookie);
              setIsLiked(!isLiked);
            }}
          >
            {isLiked && <FontAwesomeIcon icon={faHeart} color="red" />}
            {!isLiked && <Text ml="0">Like</Text>}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
