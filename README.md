# ¿Qué tenés para dar? - API

### Introduction
This is a  RESTful API to show where the users can bring their donations based on what they have to donate and where they are. By using this API you can handle users with roles, centers and donation types.

### Installation

- To install the API run:
    ```
    npm install
    ```

### Environment configurations
In order to run the app. You need to provide the following variables for the project:
- API:
    - QTPD_API_PORT - the port where the api will run
    - QTPD_API_MONGODB_URL - the url where the mongo database lives and its name. (e.g.: =mongodb://127.0.0.1:27017/qtpd-db)
    - QTPD_API_JWT_SECRET - Json web token secret key
    - The following data is needed to send emails from a gmail account:
        - QTPD_API_EMAIL_USER
        - QTPD_API_GMAIL_CLIENT_ID
        - QTPD_API_GMAIL_CLIENT_SECRET
        - QTPD_API_GMAIL_REFRESH_TOKEN
    Note: For development purposes, I would recommend to provide those variables in a file 'dev.env' under a 'config' folder in the root folder of the api project

### Usage

- To start the API run:
    ```
    npm start
    ```

### Development

- To run the API in development mode:
    ```
    npm run dev
    ```

### Docker
A Dockerfile is provided in order to create your own image. Note that you will need to provide the environment variables for the docker image.

## Authors
Martin Manzo & Alvaro Farina
