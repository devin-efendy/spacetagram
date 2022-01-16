import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { ApodData } from "apod-types";
import { Flex } from "@chakra-ui/react";

import { Astronomy, NavBar } from "../../components";
import { fetchProps } from "../../server/serverProps";

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
  return {
    props: {
      apodData: await fetchProps(ctx),
    },
  };
};

export default AstronomyPage;
