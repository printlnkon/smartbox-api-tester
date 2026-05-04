# Smartbox API Tester

Single-page HTML tool for exercising Smartbox device APIs with a friendly UI and curl output.

## Quick start

1. Open `smartbox-api-tester.html` in a browser.
2. Set Base URL to your device host, for example: `http://192.168.1.100:30000`.
3. Enter username and the MD5 password hash.
4. Run the Login endpoint to auto-fill the token.
5. Pick any endpoint, fill Path params (if shown), adjust the request body, and send.

MD5 helper:

```bash
echo -n "pass" | md5sum
```

## Features

- Sidebar endpoint browser grouped by feature area.
- Live request body editor with reset.
- Path params panel for `{placeholder}` values.
- curl equivalent output and copy button.
- Response panel with JSON syntax highlighting.
- Auto token capture on Login.

## Path params

Endpoints with placeholders like `{lib_id}` or `{channelid}` show a Path params card.
Fill the values there to replace the placeholder in the URL and curl output.
If a value is left blank, the placeholder stays in the path.

Example: Add channel uses `/api/v1/channel/add/{channelid}` where `channelid` is typically 1-4.

## File upload endpoints

The Upload upgrade package endpoint is marked as upload-only in the UI.
Browser uploads are not supported; use the curl command from the right panel.

## Endpoint groups

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

## Notes and troubleshooting

- If the browser blocks requests due to CORS, use the curl command instead.
- Token warning means Login was not run yet or the token field is empty.
- RTSP channels use `rtsp` and `encoding` fields. ONVIF channels use `url`, `port`, `username`, and `pwd`.

## Customizing endpoints

Edit the `ENDPOINTS` array in `smartbox-api-tester.html` to add or modify endpoints.