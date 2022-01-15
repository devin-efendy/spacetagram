import axios from "axios";
import { Container } from "@chakra-ui/react";
import type { NextPage, GetServerSideProps } from "next";
import { ApodData } from "apod-types";

import { Astronomy, NavBar } from "../../components";
import config from "../../config";

const NASA_APOD_API_URL = "https://api.nasa.gov/planetary/apod";

interface Props {
  apodData: ApodData[];
}

const AstronomyPage: NextPage<Props> = ({ apodData }) => {
  return (
    <Container p={0} m={0} maxW="100vw">
      <NavBar />
      <Astronomy apodData={apodData} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let nasaRes;

  try {
    nasaRes = await axios.get(
      `${NASA_APOD_API_URL}?api_key=${config.nasaApiKey}&start_date=2022-01-01&end_date=2022-01-08`
    );
  } catch (error) {
    console.error("Failed to retrieve pictures from NASA API...");
  }

  const userCookies = req.cookies?.user
    ? JSON.parse(req.cookies?.user)
    : undefined;

  let apodData = nasaRes?.data ? nasaRes.data : [];

  if (nasaRes?.data && userCookies) {
    apodData = nasaRes.data.map((apod: any) => {
      return {
        ...apod,
        isLikedCookie: userCookies.apodLikedPictures.some(
          (picId: string) => picId === apod.date
        ),
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
