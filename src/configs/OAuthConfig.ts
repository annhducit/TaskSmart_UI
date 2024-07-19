export const OAuthConfig = {
    google:{
        clientId: "795836648717-t00cmempl79d4prlrjjja3c03hdlc2dg.apps.googleusercontent.com",
        redirectUri: "http://localhost:3000/auth/oauth/google/callback",
        authUri: "https://accounts.google.com/o/oauth2/auth",
    },
    github:{
        clientId: "Iv23litqUHNbIAMARgsn",
        redirectUri: "http://localhost:3000/auth/oauth/github/callback",
        authUri: "https://github.com/login/oauth/authorize"
    }
  };