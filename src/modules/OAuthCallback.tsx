import { tsmAxios } from "@/configs/axios";
import { useEffect } from "react";

function OAuthGoogleCallBack(){
    useEffect(() => {
        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);
    
        if (isMatch) {
          const authCode = isMatch[1];
          console.log(authCode);
          tsmAxios.post(`/auth/oauth/google?code=${authCode}`).then((response) => {
            console.log(response);
          });
        }
      }, []);
    return <div>OAuthCallBack</div>
}

function OAuthGitHubCallBack(){
    useEffect(() => {
        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);
    
        if (isMatch) {
          const authCode = isMatch[1];
          console.log(authCode);
          tsmAxios.post(`/auth/oauth/github?code=${authCode}`).then((response) => {
            console.log(response);
          });
        }
      }, []);
    return <div>OAuthCallBack</div>
}
export {OAuthGoogleCallBack, OAuthGitHubCallBack}