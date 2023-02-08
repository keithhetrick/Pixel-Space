# PixelSpace-FullStack-App

This is a full stack application that uses the Dall-E API to generate images from text prompts. The application is built using React, Node, Express, and MongoDB. Images are stored in Cloudinary (a cloud-based image and video management service), and the generated image-urls are stored in a MongoDB database, for easy access & sharability.

[Pixel Space](http://18.189.184.157/)

Pixel Space built with:

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Tailwind](https://tailwindcss.com/)
- [File-Saver](https://www.npmjs.com/package/file-saver)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Cloudinary](https://cloudinary.com/)
- [Dall-E](https://openai.com/blog/dall-e/)
- [OpenAI](https://openai.com/)

## Installation

1. Clone the repo

```sh
git clone
```

2. Install NPM packages on both the client and server

```sh
npm install
```

3. Create a .env file in the server directory and add the following:

```sh
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Run the app on both the client and server

```sh
npm run start => client
nodemon server => server
```

## Usage

1. Enter a text prompt in the input field
2. Click the "Generate Image" button
3. Click the "Save Image" button to save the image to your computer
4. Click the "Share Image" button to share the image on social media
