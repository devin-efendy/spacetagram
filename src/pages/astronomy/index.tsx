import axios from "axios";
import { Container, Center } from "@chakra-ui/react";
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

/**
 * TODO:
 *
 * Use cookie to track number of likes
 * and do something useState() for tracking likes
 *
 * put it as json and use stringify
 */
export const getServerSideProps: GetServerSideProps = async (req) => {
  let nasaRes = { data: null };

  try {
    nasaRes = await axios.get(
      `${NASA_APOD_API_URL}?api_key=${config.nasaApiKey}&start_date=2022-01-01&end_date=2022-01-08`
    );
  } catch (error) {
    console.error("Failed to retrieve pictures from NASA API...");
  }

  return {
    props: {
      apodData: nasaRes.data,
    },
  };
};

export default AstronomyPage;
