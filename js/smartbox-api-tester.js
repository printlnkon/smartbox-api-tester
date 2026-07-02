import {
  applyTokenFromResponse,
  setStatus,
  state,
  syncAuthorizeButton,
} from "./config.js";
import { buildSpec } from "./spec-builder.js";

let pendingStatusMessage = null;

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
      setStatus(
        pendingStatusMessage || `Loaded ${Object.keys(spec.paths).length} paths`,
      );
      pendingStatusMessage = null;
      syncAuthorizeButton();
      populateGroupJump();
    },
  });
}

function reloadSwagger() {
  document.getElementById("swagger-ui").innerHTML = "";
  pendingStatusMessage = "Refreshed API specs";
  mountSwagger();
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
    if (id === "base-url") reloadSwagger();
  });
}

function populateGroupJump() {
  setTimeout(() => {
    const select = document.getElementById("group-jump");

    const tags = [...document.querySelectorAll("[data-tag]")]
      .map((el) => el.getAttribute("data-tag"))
      .filter(Boolean);

    const unique = [...new Set(tags)];

    if (unique.length === 0) {
      setTimeout(populateGroupJump, 500);
      return;
    }

    select.innerHTML = `<option value="">Select Group</option>`;
    for (const tag of unique) {
      const opt = document.createElement("option");
      opt.value = tag;
      opt.textContent = tag;
      select.appendChild(opt);
    }
  }, 300);
}

document.getElementById("group-jump").addEventListener("change", (e) => {
  const tag = e.target.value;
  if (!tag) return;

  const target = [...document.querySelectorAll("[data-tag]")].find(
    (el) => el.getAttribute("data-tag") === tag,
  );

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  e.target.value = "";
});

mountSwagger();
