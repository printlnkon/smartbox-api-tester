# Smartbox API Tester

A local web-based tool for testing and interacting with Smartbox device APIs.

---

## 📌 Overview

The **Smartbox API Tester** is designed to help developers explore, test, and debug Smartbox endpoints through a simple browser interface. It includes built-in tools for authentication, request editing, and response visualization.

---

## 🖥️ System & Hardware Specifications

- **Smartbox Model:** NV - Edge Computing Server ECS-504B-SF-HD  
- **Operating System:** Linux  
- **Distribution:** Zorin OS  

---

## ⚠️ Requirements

- The Smartbox device and your testing machine must be on the **same local network**
- A modern web browser (Chrome, Firefox, etc.)
- Available port (default: `3000`) for local hosting

---

## 🚀 Quick start

1. Open `smartbox-api-tester.html` in a browser.
2. Set Base URL to your device host, for example: `http://192.168.1.100:30000`.
3. Enter **username** and the **MD5 password hash**.
4. Run the *Login endpoint** to auto-fill the token.
5. Choose an endpoint, 
    - Select an endpoint
    - Fill in **Path parameters**
    - Modify request body
    - Click **Send Request**

---

## 🔐 MD5 Password helper:
Generate your password hash:

```bash
echo -n "pass" | md5sum
```

---

## ✨ Features

- Endpoint browser grouped by feature area.
- Live request body editor with reset.
- Path params panel for `{placeholder}` values.
- Curl equivalent output with copy button.
- Response viewer with JSON syntax highlighting.
- Auto token capture on Login.

---

## 📂 Endpoint groups

- Auth
- Person library
- Person info
- Arming schedule
- Platform integration
- Upgrade
- Work clothes library
- Work clothes
- Channel management
- Face monitoring
- Analysis task config
- Data retrieval
- Algorithm capabilities

---

## 🔧 Path parameters

Endpoints with placeholders like `{lib_id}` or `{channelid}` show a Path params card.
Fill the values there to replace the placeholder in the URL and curl output.
If a value is left blank, the placeholder stays in the path.

Example: Add channel uses `/api/v1/channel/add/{channelid}` where `channelid` is typically 1-4.

---

## 📤 File upload endpoints

- Some endpoints (e.g., upgrade package upload) are upload-only
- Browser uploads are not supported
- Use the generated curl command instead

---

## 🌐 Local deployment via NGINX

Use this to host the tester locally from your machine.

### 1. Set a local domain

Edit your hosts file to add a local domain:

```bash
sudo nano /etc/hosts
```

Add this line:

```text
127.0.0.1 smartbox-api.test
```

Save and exit.

In nano:

```text
Ctrl + O, Enter, Ctrl + X
```

---

### 2. Create the NGINX site config

```bash
cd /etc/nginx/sites-available
sudo nano smartbox-api-tester.conf
```

Paste this configuration and update the `root` path if needed:

```nginx
server {
	listen 3000;
	server_name smartbox-api.test;
	root /path/to/smartbox-api-tester;
	index smartbox-api-tester.html;

	location / {
		try_files $uri /smartbox-api-tester.html;
	}
}
```

---

### 3. Enable the site and reload NGINX:

```bash
sudo ln -s /etc/nginx/sites-available/smartbox-api-tester.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Access the web application:

```text
http://smartbox-api.test:3000
```

---

## Notes and troubleshooting
- This tool is intended for **local/internal network use**
- If the browser blocks requests due to CORS, use the curl command instead.
- Token warning means Login was not run yet or the token field is empty.
- RTSP channels use `rtsp` and `encoding` fields. ONVIF channels use `url`, `port`, `username`, and `pwd`.

## 🛠️ Customizing endpoints

Edit the `ENDPOINTS` array in `smartbox-api-tester.html` to add or modify endpoints.