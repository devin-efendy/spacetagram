import axios from "axios";
import { format, subDays } from "date-fns";

import config from "../config";

const NASA_APOD_API_URL = "https://api.nasa.gov/planetary/apod";

export const fetchProps = async (ctx: any) => {
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

  return apodData;
};
