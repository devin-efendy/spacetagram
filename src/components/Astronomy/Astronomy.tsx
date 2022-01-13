import type { NextPage } from "next";
import { ApodData } from "apod-types";

const CONTENT = "CONTENT";

interface Props {
  apodData: ApodData[];
}

export const Astronomy: NextPage<Props> = ({ apodData }) => {
  // console.log("Astronomy: ", apodData);
  const apodList = apodData.map((pic: ApodData) => {
    const { copyright, data, explanation, title, url } = pic;
    return pic;
  });

  // console.log(apodList);

  return <div>{CONTENT}</div>;
};
