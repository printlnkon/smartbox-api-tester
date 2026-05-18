import {
  applyTokenFromResponse,
  setStatus,
  state,
  syncAuthorizeButton,
} from "./config.js";
import { buildSpec } from "./spec-builder.js";

function mountSwagger() {
  const spec = buildSpec();
  state.swagger = SwaggerUIBundle({
    dom_id: "#swagger-ui",
    spec,
    deepLinking: true,
    docExpansion: "list",
    displayRequestDuration: true,
    persistAuthorization: true,
    showExtensions: true,
    tryItOutEnabled: true,
    withCredentials: false,

    requestInterceptor: (req) => {
      const token = document.getElementById("token").value.trim();
      const isLogin = req.url && req.url.includes("/api/v1/user/login");
      if (token && !isLogin) {
        req.headers = req.headers || {};
        req.headers.Authorization = token;
      }
      return req;
    },
    responseInterceptor: (response) => applyTokenFromResponse(response),
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: "BaseLayout",

    onComplete: () => {
      setStatus(`Loaded ${Object.keys(spec.paths).length} paths`);
      syncAuthorizeButton();
    },
  });
}

function reloadSwagger() {
  document.getElementById("swagger-ui").innerHTML = "";
  mountSwagger();
  setStatus("Spec reloaded");
}

document.getElementById("reload-spec").addEventListener("click", reloadSwagger);
document.getElementById("clear-token").addEventListener("click", () => {
  document.getElementById("token").value = "";
  syncAuthorizeButton();
  setStatus("Token cleared");
});

for (const id of ["base-url", "username", "password-md5", "token"]) {
  document.getElementById(id).addEventListener("change", () => {
    if (id === "token") syncAuthorizeButton();
  });
}

mountSwagger();
