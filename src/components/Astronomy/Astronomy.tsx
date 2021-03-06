import { Box } from "@chakra-ui/react";
import { ApodData } from "apod-types";

import { ApodCard } from "../ApodCard";

interface Props {
  apodData: ApodData[];
}

export const Astronomy = ({ apodData }: Props) => {
  const renderApod = apodData.map((pic: ApodData) => {
    const {
      copyright,
      date,
      explanation,
      title,
      url,
      mediaType,
      isLikedCookie,
    } = pic;

    return (
      <ApodCard
        key={date}
        copyright={copyright}
        date={date}
        explanation={explanation}
        title={title}
        url={url}
        mediaType={mediaType}
        isLikedCookie={isLikedCookie}
      />
    );
  });

  return (
    <Box
      padding={4}
      w="1400px"
      maxW="100vw"
      mx="auto"
      sx={{ columnCount: [1, 1, 2, 2, 3], columnGap: "6" }}
    >
      {renderApod}
    </Box>
  );
};
