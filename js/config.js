export const state = { swagger: null };

export function getConfig() {
  return {
    baseUrl: document
      .getElementById("base-url")
      .value.trim()
      .replace(/\/$/, ""),
    username: document.getElementById("username").value.trim(),
    passwordMd5: document.getElementById("password-md5").value.trim(),
    token: document.getElementById("token").value.trim(),
  };
}

export function setStatus(message) {
  document.getElementById("status-line").textContent = message;
}

export function syncAuthorizeButton() {
  if (!state.swagger || !state.swagger.authActions) return;
  try {
    const token = document.getElementById("token").value.trim();
    state.swagger.authActions.authorize(
      token ? { tokenAuth: { value: token } } : { tokenAuth: { value: "" } },
    );
  } catch {}
}

export function applyTokenFromResponse(response) {
  const requestUrl = response?.url || response?.request?.url || "";
  if (!requestUrl) return response;

  const isLogin = requestUrl.includes("/api/v1/user/login");
  const isLogout = requestUrl.includes("/api/v1/user/logout");
  const isUpdateToken = requestUrl.includes("/api/v1/user/update_token");
  if (!isLogin && !isUpdateToken && !isLogout) return response;

  const tokenInput = document.getElementById("token");
  if (!tokenInput) return response;

  if (isLogout) {
    tokenInput.value = "";
    syncAuthorizeButton();
    setStatus("Token cleared after logout");
    return response;
  }

  if (!response || response.status < 200 || response.status >= 300) {
    return response;
  }

  let responseBody = response.data ?? response.body;
  if (typeof responseBody === "string") {
    try {
      responseBody = JSON.parse(responseBody);
    } catch {
      responseBody = null;
    }
  }

  const token = responseBody?.data?.token;
  if (token) {
    tokenInput.value = token;
    syncAuthorizeButton();
    setStatus(
      isUpdateToken ? "Token updated" : "Token filled from login response",
    );
  }

  return response;
}
