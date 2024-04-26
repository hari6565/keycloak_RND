"use client";

import Keycloak from "keycloak-js";
import { useEffect, useRef, useState } from "react";

const useAuth = () => {
  const useRefs = useRef(false);
  const [token, settoken] = useState<any>("");

  const url = process.env.NEXT_PUBLIC_SECRET_KEY_KEYCLOAK_URL;
  const realm: string | any = process.env.NEXT_PUBLIC_SECRET_KEY_REALM;
  const clientId: string | any = process.env.NEXT_PUBLIC_SECRET_KEY_CLIENT;
  const [keyCloak, setkeycloak] = useState<any>(null);

  useEffect(() => {
    if (useRefs.current) return;
    useRefs.current = true;
    const client = new Keycloak({
      url: url,
      realm: realm,
      clientId: clientId,
    });
    setkeycloak(client);
    client
      .init({
        onLoad: "login-required",
        redirectUri: "http://localhost:3000",
      })
      .then(() => {
        settoken(client.token);
      });
  }, []);

  return [keyCloak, token];
};

export default useAuth;

// "http://192.168.2.110:8080/realms/testRealm/login-actions/reset-credentials?session_code=igf9fJUcjYkQk-gOsLN5T2s2k6G9EdA2hxPiZx7zbfk&amp;execution=3c48677f-f684-447f-bea9-31bd112dc42d&amp;client_id=demoClient&amp;tab_id=iCVBv1pjW9E" method="post

// # First, authenticate with Keycloak to get an access token
// TOKEN=$(curl -X POST 'http://localhost:8080/auth/realms/master/protocol/openid-connect/token' \
//  -H "Content-Type: application/x-www-form-urlencoded" \
//  -d "username=admin" \
//  -d "password=admin" \
//  -d "grant_type=password" \
//  -d "client_id=admin-cli" | jq -r '.access_token')

// # Add GitHub as an identity provider
// curl -X POST 'http://localhost:8080/auth/admin/realms/{realm}/identity-provider/instances' \
// -H "Authorization: Bearer $TOKEN" \
// -H "Content-Type: application/json" \
// --data '{
//   "alias": "github",
//   "displayName": "GitHub",
//   "providerId": "github",
//   "enabled": true,
//   "config": {
//     "clientId": "YOUR_GITHUB_CLIENT_ID",
//     "clientSecret": "YOUR_GITHUB_CLIENT_SECRET",
//     "authorizationUrl": "https://github.com/login/oauth/authorize",
//     "tokenUrl": "https://github.com/login/oauth/access_token",
//     "userInfoUrl": "https://api.github.com/user",
//     "defaultScope": "read:user"
//   }
// }'
