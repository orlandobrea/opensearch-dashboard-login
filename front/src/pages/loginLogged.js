import React, { useEffect } from "react";
import config from "../config";

export default function LoginLogged() {
  useEffect(() => {}, []);

  return (
    <div>
      <iframe
        src={config.AUTH_URL + "/_dashboards"}
        title="Kibana"
        width="800"
        height="800"
      ></iframe>
    </div>
  );
}
