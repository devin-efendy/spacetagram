import { render, fireEvent } from "@testing-library/react";
import { format } from "date-fns";
import "@testing-library/jest-dom";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import { ApodCard, handleUserCookie } from "./ApodCard";

jest.mock("uuid", () => {
  return {
    __esModule: true,
    v4: jest.fn(() => "mocked baz"),
  };
});

describe("ApodCard component", () => {
  const mockProps = {
    copyright: "First Last",
    date: "2021-06-06",
    title: "Title Picture A",
    url: "/some/url/to/test",
    explanation: "explanation for apod",
    isLikedCookie: false,
  };

  test("should renders successfully given proper properties", () => {
    const { getByText } = render(<ApodCard {...mockProps} />);

    const parsedDate = format(new Date(mockProps.date), "MMM dd, yyyy");
    expect(
      getByText(`${parsedDate} @ ${mockProps.copyright}`)
    ).toBeInTheDocument();
    expect(getByText(mockProps.title)).toBeInTheDocument();
    expect(getByText(mockProps.explanation)).toBeInTheDocument();
    expect(getByText("Like")).toBeInTheDocument();
  });

  test("should changes like button when clicked", () => {
    const { getByText, queryByText, getByTestId, queryByTestId } = render(
      <ApodCard {...mockProps} />
    );

    expect(getByText("Like")).toBeInTheDocument();

    fireEvent(getByText("Like"), new MouseEvent("click", { bubbles: true }));

    expect(queryByText("Like")).toBeFalsy();
    expect(getByTestId("TEST_HEART_ICON")).toBeInTheDocument();

    fireEvent(
      getByTestId("TEST_HEART_ICON"),
      new MouseEvent("click", { bubbles: true })
    );

    expect(getByText("Like")).toBeInTheDocument();
    expect(queryByTestId("TEST_HEART_ICON")).toBeFalsy();
  });
});

describe("ApodCard cookie", () => {
  const mockSetCookies = jest.fn();

  const mockSetCookieSetting = {
    path: "/",
    maxAge: 3600,
    sameSite: true,
  };

  beforeEach(() => {
    document.cookie = "user=; expires=1 Jan 1970 00:00:00 GMT;";
    jest.clearAllMocks();
  });

  test("create new use cookie", () => {
    handleUserCookie("2022-03-03", false, undefined, mockSetCookies);

    expect(mockSetCookies).toHaveBeenCalledWith(
      "user",
      JSON.stringify({
        id: uuidv4(),
        apodLikedPictures: ["2022-03-03"],
      }),
      mockSetCookieSetting
    );
  });

  test("add liked picture to cookie", () => {
    const mockCookie = {
      user: { id: uuidv4(), apodLikedPictures: ["2022-02-02"] },
    };

    handleUserCookie("2022-03-03", false, mockCookie, mockSetCookies);

    expect(mockSetCookies).toHaveBeenCalledWith(
      "user",
      JSON.stringify({
        id: uuidv4(),
        apodLikedPictures: ["2022-02-02", "2022-03-03"],
      }),
      mockSetCookieSetting
    );
  });

  test("remove unliked picture from cookie", () => {
    const mockCookie = {
      user: { id: uuidv4(), apodLikedPictures: ["2022-03-03"] },
    };

    handleUserCookie("2022-03-03", true, mockCookie, mockSetCookies);

    expect(mockSetCookies).toHaveBeenCalledWith(
      "user",
      JSON.stringify({
        id: uuidv4(),
        apodLikedPictures: [],
      }),
      mockSetCookieSetting
    );
  });
});
