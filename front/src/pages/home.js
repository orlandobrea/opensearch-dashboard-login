import React from "react";
import config from "../config"

export default function Home() {
  return (<div>
    You can start the <a href={config.AUTH_URL + "/login?response_type=code&client_id=" + config.AUTH_CLIENT_ID + "&redirect_uri=" + config.APP_SERVER+"/auth/code"}>login process now</a>

  </div >)
}
