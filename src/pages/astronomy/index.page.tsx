import axios from "axios";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { ApodData } from "apod-types";
import { format, subDays } from "date-fns";
import { Flex } from "@chakra-ui/react";

import { Astronomy, NavBar } from "../../components";
import config from "../../config";

const NASA_APOD_API_URL = "https://api.nasa.gov/planetary/apod";

interface Props {
  apodData: ApodData[];
}

const AstronomyPage: NextPage<Props> = ({ apodData }) => {
  let renderPageContent;

  if (apodData && apodData.length > 0) {
    renderPageContent = <Astronomy apodData={apodData} />;
  } else {
    renderPageContent = (
      <Flex
        h="500px"
        p="4"
        d="flex"
        align="center"
        justify="center"
        fontSize="20"
        fontWeight="semibold"
      >
        Sorry, there is an error and we are trying our best to fix it! :(
      </Flex>
    );
  }

  return (
    <>
      <NavBar />
      <Head>
        <title>Spacetagram - Astronomy</title>
        <meta
          name="description"
          content="Seven pictures from NASA Astronomy Picture of the Day"
        />
        <meta name="keywords" content="astronomy, nasa, pictures, space" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {renderPageContent}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let nasaRes;
  let apodData = [];

  const todayDate = new Date();
  const lastWeekDate = subDays(todayDate, 7);

  const formattedTodayDate = format(todayDate, config.NASA_DATE_FORMAT);
  const formattedLastWeekDate = format(lastWeekDate, config.NASA_DATE_FORMAT);

  try {
    nasaRes = await axios.get(
      `${NASA_APOD_API_URL}?api_key=${config.NASA_API_KEY}&start_date=${formattedLastWeekDate}&end_date=${formattedTodayDate}`
    );
  } catch (error: any) {
    console.error(
      "Failed to retrieve pictures from NASA API --",
      error.response.data
    );
  }

  const userCookies = ctx.req.cookies?.user
    ? JSON.parse(ctx.req.cookies?.user)
    : undefined;

  if (nasaRes?.data) {
    apodData = nasaRes.data.map((apod: any) => {
      const { copyright = "", date, explanation, title, url } = apod;

      const isLikedCookie = userCookies
        ? userCookies.apodLikedPictures.some(
            (picId: string) => picId === apod.date
          )
        : false;

      return {
        copyright,
        date,
        title,
        explanation,
        url,
        mediaType: apod.media_type,
        isLikedCookie,
      };
    });
  }

  return {
    props: {
      apodData,
    },
  };
};

export default AstronomyPage;
