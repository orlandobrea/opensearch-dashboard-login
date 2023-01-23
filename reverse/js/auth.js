async function content(r) {
  const clientDomain = "localhost:3000";
  const server = `https://<cognito host here>`;
  const headers = {
    Authorization:
      "Basic <base64('clientId:clientSecret')",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  r.headersOut["Content-Type"] = "application/json";
  const bodyParts = r.requestText.split("&");

  const clientParts = bodyParts.find((part) => part.startsWith("client_id"));
  const clientId = clientParts.split("=")[1];

  const codeParts = bodyParts.find((part) => part.startsWith("code"));
  const code = codeParts.split("=")[1];

  const redirectParts = bodyParts.find((part) =>
    part.startsWith("redirect_uri")
  );
  const redirectUri = redirectParts.split("=")[1];

  const body = `grant_type=${encodeURIComponent(
    "authorization_code"
  )}&client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${encodeURIComponent(
    code
  )}`;
  ngx
    .fetch(`${server}/oauth2/token`, {
      headers,
      method: "POST",
      body,
    })
    .then((res) => {
      res
        .json()
        .then((body) => {
          r.headersOut["Content-Type"] = "application/json";
          if (body.id_token) {
            const cookies = [
              `ID-TOKEN=${body.id_token}; Path=/_dashboards; Secure; HttpOnly; SameSite=Lax`,
              `ACCESS-TOKEN=${body.access_token}; Path=/_dashboards;Secure;HttpOnly;SameSite=Lax`,
              `REFRESH-TOKEN=${body.refresh_token}; Path=/_dashboards;Secure;HttpOnly;SameSite=Lax;`,
            ];
            r.headersOut["Set-Cookie"] = cookies;
          }
          r.headersOut["Access-Control-Allow-Origin"] = clientDomain;
          r.headersOut["Access-Control-Allow-Credentials"] = "true";
          r.return(200, JSON.stringify(body));
        })
        .catch((e2) => {
          r.headersOut["Content-Type"] = "application/json";
          r.return(500, e2);
        });
    })
    .catch((e) => {
      r.headersOut["Content-Type"] = "application/json";
      r.return(500, e);
    });
}

export default { content };
