# Sentry-Project Website

NodeJS website for Portfolio 2 project, Sentry.

Main project can be found [here](https://github.com/kahkoii/Sentry-Project).

  

### Hosted on Heroku

Live website can be found [here](https://sentry-p2.herokuapp.com/).

  

### Running the app locally

The app can be run using `nodemon run` or `node app`.

After running, the website can be found on **localhost:3000**.

  

## API

To upload an image directly to the database, using Postman, follow the steps below.

1: Select **POST** method

2: Set request URL to **localhost:3000/api/student/upload**

3: Select body > form-data

4: Input **id** and **image** for the 2 keys

5: Fill in the student ID for id, and select a local image file for image