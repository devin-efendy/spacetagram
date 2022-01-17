# [Spacetagram](https://spacetagram-one.vercel.app/astronomy)

Spacetagram is an image sharing application built with [Next.js](https://nextjs.org) and [Chakra-UI](https://chakra-ui.com). This application shows Astronomy Picture of the Day using [NASA API](https://api.nasa.gov/#apod). It uses cookie to track image that users have liked.

![Screen Shot 2022-01-16 at 7 32 26 PM](https://user-images.githubusercontent.com/36686154/149687475-3b52f1f3-d996-42d0-a777-fa369fedc7e1.png)

## Running Spacetagram

First, install the dependencies:

```bash
npm install
```

You also need to have NASA API Key which you can get here: https://api.nasa.gov/

Create new `.env` file:

```bash
cp .env.test .env
```

After that set `NASA_API_KEY` environment variable in `.env` file to your new API Key.

Finally, you can run the application locally:

```bash
npm run dev
```

The application is available on [http://localhost:3000/astronomy](http://localhost:3000/astronomy)

## Code Style

We use eslint to enforce code style. The settings for eslint is available at [.eslintrc](./.eslintrc).

Currently, we follow [@shopify/eslint-plugin](https://www.npmjs.com/package/@shopify/eslint-plugin)

To run linter:

```bash
npm run lint
```

## Testing

For testing, we use [Jest](https://jestjs.io) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

To run the test:

```bash
npm run test
```

## Contributing

When committing changes, Husky [pre-commit script](./.husky/pre-commit) will be executed which runs eslint and test, to make sure changes are following the code style and tests are not failing.

## Deployment

This app is deployed using Vercel: [https://spacetagram-devin-efendy.vercel.app/astronomy](https://spacetagram-devin-efendy.vercel.app/astronomy)
