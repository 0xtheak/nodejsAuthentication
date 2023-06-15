# Node.js Login and Social Login App

This is a simple Node.js application that provides user authentication with login, sign up, and social login capabilities.

## Features

- User registration with email and password
- User login with email and password
- Social login Google
- Session-based authentication
- Minimalistic user interface

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/0xtheak/nodejsAuthentication.git

    Navigate to the project directory:


cd nodejsAuthentication

Install the dependencies:

shell

npm install

Set up environment variables:

    Rename the .env.example file to .env
    Replace the placeholders with your own configuration details for social login (e.g., Google client ID and secret).
    smptMail=''
    smtpMailPass=''
    mongoDBUrl=''
    GoogleClientId=""
    GoogleClientSecret=""
    GoogleCallbackUrl="http://localhost:5000/users/auth/google/callback"
    SessionSecretName="session"
    SessionSecret=""

    Filled all the variables values  

Start the application:

npm start

Access the app in your browser:


    http://localhost:5000

Usage

    Register a new user by providing an email and password.
    Log in with the registered email and password.
    Alternatively, click on the Google buttons to log in using social media accounts.

Dependencies

The app uses the following major dependencies:

    Express: Fast, unopinionated, minimalist web framework for Node.js.
    Passport: Simple, unobtrusive authentication middleware for Node.js.
    Passport-local: Passport strategy for authenticating with a username and password.
    Passport-facebook: Passport strategy for authenticating with Facebook.
    Passport-google-oauth20: Passport strategy for authenticating with Google using OAuth 2.0.

For a full list of dependencies, please refer to the package.json file.
Contributing

Contributions are welcome! If you have any improvements or bug fixes, feel free to submit a pull request.
License

This project is licensed under the MIT License.



Feel free to modify the content according to your specific app's structure and requirements.