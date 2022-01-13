import { ApodData } from "apod-types";
import axios from "axios";
import type { NextPage, GetServerSideProps } from "next";

import { Astronomy } from "../../components";
import config from "../../config";

const PAGE_TITLE = "Astronomy Page /astronomy";
const NASA_APOD_API_URL = "https://api.nasa.gov/planetary/apod";

interface Props {
  apodData: ApodData[];
}

const AstronomyPage: NextPage<Props> = ({ apodData }) => {
  return <Astronomy apodData={apodData} />;
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
    // console.error("Failed to retrieve pictures from NASA API...");
  }

  return {
    props: {
      apodData: nasaRes.data,
    },
  };
};

export default AstronomyPage;
