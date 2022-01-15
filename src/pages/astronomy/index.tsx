import axios from "axios";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { ApodData } from "apod-types";

import { Astronomy, NavBar } from "../../components";
import config from "../../config";

const NASA_APOD_API_URL = "https://api.nasa.gov/planetary/apod";

interface Props {
  apodData: ApodData[];
}

const AstronomyPage: NextPage<Props> = ({ apodData }) => {
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
      <Astronomy apodData={apodData} />
    </>
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
