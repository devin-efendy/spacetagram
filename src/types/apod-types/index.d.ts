declare module "apod-types" {
  export interface ApodData {
    copyright: string;
    date: string;
    explanation: string;
    title: string;
    url: string;
    isLikedCookie: boolean;
    mediaType: string;
  }
}
