import axios from "axios";
import { GetServerSidePropsContext } from "next/types";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

import { getServerSideProps } from "./index.page";

jest.mock("axios");

const mockNasaResponse = [
  {
    copyright: "First Last",
    date: "2022-02-02",
    title: "Title Picture A",
    url: "/some/url/to/a/test",
    explanation: "explanation for apod a",
    hdurl: "/some/url/to/test/a/hd",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    media_type: "image",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    service_version: "v1",
  },
  {
    copyright: "First2 Last2",
    date: "2022-03-03",
    title: "Title Picture B",
    url: "/some/url/to/test/b",
    explanation: "explanation for apod b",
    hdurl: "/some/url/to/test/b/hd",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    media_type: "image",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    service_version: "v1",
  },
];

const mockServerSideProps = [
  {
    copyright: "First Last",
    date: "2022-02-02",
    title: "Title Picture A",
    explanation: "explanation for apod a",
    url: "/some/url/to/a/test",
    mediaType: "image",
    isLikedCookie: false,
  },
  {
    copyright: "First2 Last2",
    date: "2022-03-03",
    title: "Title Picture B",
    explanation: "explanation for apod b",
    url: "/some/url/to/test/b",
    mediaType: "image",
    isLikedCookie: false,
  },
];

describe("/astronomy getServerSideProps", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return props without user cookie", async () => {
    const mockCtx = {
      req: {
        cookies: {},
      },
    };

    axios.get = jest.fn().mockResolvedValue({ data: mockNasaResponse });

    const result = await getServerSideProps(
      mockCtx as GetServerSidePropsContext
    );

    expect(JSON.stringify(result)).toBe(
      JSON.stringify({ props: { apodData: mockServerSideProps } })
    );
  });

  test("should return props when user cookie exist", async () => {
    const mockApodData = [
      {
        ...mockServerSideProps[0],
        isLikedCookie: false,
      },
      {
        ...mockServerSideProps[1],
        isLikedCookie: true,
      },
    ];

    const mockCtx = {
      req: {
        cookies: {
          user: JSON.stringify({
            id: "12345-abcde",
            apodLikedPictures: ["2022-03-03"],
          }),
        } as NextApiRequestCookies,
      },
    };

    axios.get = jest.fn().mockResolvedValue({ data: mockNasaResponse });

    const result = await getServerSideProps(
      mockCtx as GetServerSidePropsContext
    );

    expect(JSON.stringify(result)).toBe(
      JSON.stringify({ props: { apodData: mockApodData } })
    );
  });
});
