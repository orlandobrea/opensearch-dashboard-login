import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import config from "../config";

export default function LoginCode() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      const payload = `grant_type=authorization_code&client_id=${config.AUTH_CLIENT_ID}&code=${code}&redirect_uri=${config.APP_SERVER}/auth/code`;
      fetch(`${config.AUTH_URL}/oauth2/token`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        credentials: "include",
        body: payload,
      })
        .then((res) => res.json())
        .then((_) => {
          return navigate("/dashboard");
        });
    }
  }, []);

  return (
    <div>
      Mi pagina de login <br />
      {searchParams.get("code")}
      <br />
      <Link to={`/`}>Back to home</Link>
      <br />
      <Link to={`/dashboard`}>Dashboard</Link>
    </div>
  );
}
