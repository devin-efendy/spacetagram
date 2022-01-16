import { useState } from "react";
import { useCookies } from "react-cookie";
import { AspectRatio, Box, Image, Flex, Button, Text } from "@chakra-ui/react";
import { format, parse } from "date-fns";
import { ApodData } from "apod-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import config from "../../config";

export function handleUserCookie(
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
    path: "/astronomy",
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
  mediaType,
  isLikedCookie,
}: ApodData) => {
  const [isLiked, setIsLiked] = useState(isLikedCookie);
  const [cookies, setCookie] = useCookies(["user"]);
  const parsedDate = format(
    parse(date, config.NASA_DATE_FORMAT, new Date()),
    "MMM dd, yyyy"
  );
  const renderCopyright = ` @ ${copyright}`;

  const likeButtonBg = isLiked ? "pink.100" : "none";
  const likeButtonAria = isLiked
    ? `You're currently liked "${title}" image`
    : `You currently do not like "${title}" image`;

  const renderMediaContent =
    mediaType === "image" ? (
      <Image src={url} alt={title} />
    ) : (
      <AspectRatio maxW="100%" ratio={1}>
        <iframe
          data-testid="TEST_VIDEO_PLAYER"
          title={title}
          src={url}
          allowFullScreen
        />
      </AspectRatio>
    );

  return (
    <Box
      d="inline-block"
      borderWidth="1px"
      borderRadius="xl"
      w="100%"
      mb="5"
      overflow="hidden"
    >
      {renderMediaContent}
      <Box p="4">
        <Text mt="1" as="h1" fontWeight="bold">
          {title}
        </Text>
        <Text mb="3" as="h2" color="gray.600">
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
            aria-label={`Toggle like button. ${likeButtonAria}`}
          >
            {isLiked && (
              <FontAwesomeIcon
                data-testid="TEST_HEART_ICON"
                icon={faHeart}
                color="red"
              />
            )}
            {!isLiked && (
              <Text ml="0" as="span">
                Like
              </Text>
            )}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
