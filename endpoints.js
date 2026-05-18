import { getConfig } from "./config.js";

export const ENDPOINTS = [
  {
    group: "Auth",
    method: "POST",
    title: "Login",
    path: "/api/v1/user/login",
    description:
      "Obtain a session token. Password must be MD5-hashed. Token is valid for the duration returned in expires (seconds).",
    body: () =>
      JSON.stringify(
        { name: getConfig().username, pwd: getConfig().passwordMd5 },
        null,
        2,
      ),
    responseExamples: {
      200: {
        description: "Login response",
        example: {
          code: 0,
          data: { token: "TOKEN_VALUE", expires: 7200 },
          msg: "ok",
        },
      },
    },
  },
  {
    group: "Auth",
    method: "POST",
    title: "Logout",
    path: "/api/v1/user/logout",
    description: "Invalidate the current token.",
    body: () =>
      JSON.stringify(
        {
          name: getConfig().username,
          token: getConfig().token || "YOUR_TOKEN",
        },
        null,
        2,
      ),
  },
  {
    group: "Auth",
    method: "GET",
    title: "Update token",
    path: "/api/v1/user/update_token",
    description: "Refreshes the current token validity period.",
  },
  {
    group: "Person Library",
    method: "POST",
    title: "Add person library",
    path: "/api/v1/smart/personlib/",
    description:
      "Create a new person library. lib_type 1=Blocklist, 2=Allowlist.",
    body: () =>
      JSON.stringify(
        {
          lib_title: "My Library",
          lib_type: 1,
        },
        null,
        2,
      ),
  },
  {
    group: "Person Library",
    method: "GET",
    title: "Query person libraries",
    path: "/api/v1/smart/personlib/",
  },
  {
    group: "Person Library",
    method: "PUT",
    title: "Modify person library",
    path: "/api/v1/smart/personlib/{lib_id}",
    description:
      "Rename a library. Replace {lib_id} in the path with the actual ID.",
    body: () => JSON.stringify({ lib_title: "Renamed Library" }, null, 2),
  },
  {
    group: "Person Library",
    method: "DELETE",
    title: "Delete person library",
    path: "/api/v1/smart/personlib/{lib_id}",
    description: "Permanently deletes a library and all its members.",
  },
  {
    group: "Person Info",
    method: "POST",
    title: "Add person info",
    path: "/api/v1/smart/personlib/{lib_id}/members",
    description:
      "Add a face to a person library. photo_base64 is required - generate with: base64 -w 0 face.jpg",
    body: () =>
      JSON.stringify(
        {
          name: "John Doe",
          sex: 1,
          email: "",
          tel: "",
          certificate_type: 99,
          certificate_no: "",
          birth_date: "",
          photo_base64: "<BASE64_JPEG>",
        },
        null,
        2,
      ),
  },
  {
    group: "Person Info",
    method: "PUT",
    title: "Modify person info",
    path: "/api/v1/smart/personlib/{lib_id}/members",
    body: () =>
      JSON.stringify({ face_id: 1, name: "Jane Doe", sex: 2 }, null, 2),
  },
  {
    group: "Person Info",
    method: "DELETE",
    title: "Delete person info",
    path: "/api/v1/smart/personlib/members",
    body: () => JSON.stringify({ lib_id: 1, face_id_list: [1, 2] }, null, 2),
  },
  {
    group: "Person Info",
    method: "POST",
    title: "Query person info",
    path: "/api/v1/smart/personlib/{lib_id}/members_list",
    body: () => JSON.stringify({ page: 1, size: 100 }, null, 2),
  },
  {
    group: "Arming Schedule",
    method: "GET",
    title: "Get arming schedule",
    path: "/api/v1/smart/config/weekplan/{channelid}/{tasktype}",
    description:
      "tasktype values: safehatdetection, smokingdetection, callingdetection, facedetection, regionalinvasion, falldetection, maskdetection, and more.",
  },
  {
    group: "Arming Schedule",
    method: "PUT",
    title: "Modify arming schedule",
    path: "/api/v1/smart/config/weekplan/{channelid}/{tasktype}",
    body: () =>
      JSON.stringify(
        {
          plancfg: [
            { dayid: 1, timesectioninfos: [{ begin: 0, end: 1440 }] },
            { dayid: 2, timesectioninfos: [{ begin: 0, end: 0 }] },
            { dayid: 3, timesectioninfos: [{ begin: 0, end: 0 }] },
            { dayid: 4, timesectioninfos: [{ begin: 0, end: 0 }] },
            { dayid: 5, timesectioninfos: [{ begin: 0, end: 1440 }] },
            { dayid: 6, timesectioninfos: [{ begin: 0, end: 0 }] },
            { dayid: 7, timesectioninfos: [{ begin: 0, end: 0 }] },
          ],
        },
        null,
        2,
      ),
  },
  {
    group: "Platform Integration",
    method: "GET",
    title: "Get integration config",
    path: "/api/v1/notify/config",
  },
  {
    group: "Platform Integration",
    method: "PUT",
    title: "Modify integration config",
    path: "/api/v1/notify/config",
    body: () =>
      JSON.stringify(
        {
          link_list: [
            {
              enabled: 1,
              id: 1,
              link_type: "http",
              pic_enable: 1,
              url: "http://YOUR_SERVER:8080/alarm",
              video_enable: 0,
              video_url: "",
            },
          ],
        },
        null,
        2,
      ),
  },
  {
    group: "Upgrade",
    method: "POST",
    title: "Upload upgrade package",
    path: "/bars/v1/patch/upload",
    description: "Upload via multipart/form-data. Use curl for file uploads.",
    isUpload: true,
  },
  {
    group: "Upgrade",
    method: "POST",
    title: "Perform upgrade",
    path: "/bars/v1/patch/update",
    body: () =>
      JSON.stringify(
        {
          name: "firmware.tar.gz",
          path: "/var/fs_disk/aox/patch/firmware.tar.gz",
        },
        null,
        2,
      ),
  },
  {
    group: "Work Clothes Library",
    method: "POST",
    title: "Add work clothes library",
    path: "/api/v1/smart/workclotheslib/workclothesfile",
    body: () => JSON.stringify({ libname: "WorkLib01" }, null, 2),
  },
  {
    group: "Work Clothes Library",
    method: "GET",
    title: "Query work clothes libraries",
    path: "/api/v1/smart/workclotheslib/workclothesfile",
  },
  {
    group: "Work Clothes Library",
    method: "PUT",
    title: "Modify work clothes library",
    path: "/api/v1/smart/workclotheslib/workclothesfile/{libid}",
    body: () => JSON.stringify({ libname: "RenamedLib" }, null, 2),
  },
  {
    group: "Work Clothes Library",
    method: "DELETE",
    title: "Delete work clothes library",
    path: "/api/v1/smart/workclotheslib/workclothesfile/{libid}",
  },
  {
    group: "Work Clothes",
    method: "POST",
    title: "Add work clothes",
    path: "/api/v1/smart/workclotheslib/workclothesfile/{libid}/workclothes",
    body: () => JSON.stringify({ base64text: ["<BASE64_IMAGE>"] }, null, 2),
  },
  {
    group: "Work Clothes",
    method: "GET",
    title: "Query work clothes (basic)",
    path: "/api/v1/smart/workclotheslib/workclothesfile/{libid}/workclothes",
    description: "Query params: ?page=1&size=10",
  },
  {
    group: "Work Clothes",
    method: "POST",
    title: "Query work clothes (with modeling)",
    path: "/api/v1/smart/workclotheslib/workclothesfile/{libid}/search",
    body: () =>
      JSON.stringify({ page: 1, size: 10, modeling_type: 255 }, null, 2),
  },
  {
    group: "Work Clothes",
    method: "DELETE",
    title: "Delete work clothes",
    path: "/api/v1/smart/workclotheslib/workclothesfile/{libid}/workclothes",
    body: () => JSON.stringify({ clothesid_list: [1, 2] }, null, 2),
  },
  {
    group: "Channel Management",
    method: "POST",
    title: "Add channel",
    path: "/api/v1/channel/add/{channelid}",
    body: () =>
      JSON.stringify(
        {
          name: "south entrance",
          type: "onvif",
          url: "192.168.1.112",
          port: "80",
          username: "admin",
          pwd: "Admin1234",
          transport_type: "tcp",
        },
        null,
        2,
      ),
  },
  {
    group: "Channel Management",
    method: "GET",
    title: "Query all channels",
    path: "/api/v1/channel/",
  },
  {
    group: "Channel Management",
    method: "DELETE",
    title: "Delete channel",
    path: "/api/v1/channel/",
    body: () => JSON.stringify({ id_list: [1, 2] }, null, 2),
  },
  {
    group: "Face Monitoring",
    method: "POST",
    title: "Add face monitoring task",
    path: "/api/v1/smart/config/faceguard/{channel_id}",
    body: () =>
      JSON.stringify(
        {
          enable: true,
          guardreason: "face comparison",
          guardtype: 0,
          libid: [1],
          libtype: 1,
          taskname: "entrance-monitor",
          threshold: 80,
        },
        null,
        2,
      ),
  },
  {
    group: "Face Monitoring",
    method: "GET",
    title: "Query face monitoring tasks",
    path: "/api/v1/smart/config/faceguard/{channel_id}",
  },
  {
    group: "Face Monitoring",
    method: "PUT",
    title: "Modify face monitoring task",
    path: "/api/v1/smart/config/faceguard/{guardid}",
    body: () =>
      JSON.stringify(
        {
          channelid: 1,
          enable: true,
          guardid: 1,
          guardreason: "updated reason",
          guardtype: 0,
          libid: [1],
          libtype: 1,
          taskname: "updated-task",
          threshold: 75,
        },
        null,
        2,
      ),
  },
  {
    group: "Face Monitoring",
    method: "DELETE",
    title: "Delete face monitoring task",
    path: "/api/v1/smart/config/faceguard",
    body: () => JSON.stringify({ guardids: [1] }, null, 2),
  },
  {
    group: "Analysis Task Config",
    method: "PUT",
    title: "Configure analysis task",
    path: "/api/v1/smart/config/task/all/{channelid}",
    body: () =>
      JSON.stringify(
        {
          task_type: "ba",
          params: {
            ba: {
              alarmvideoen: 1,
              afteralarmedtime: 5,
              beforalarmedtime: 5,
              leaveduration: 10,
              sleepduration: 300,
              fallduration: 5,
              goodsmoveduration: 1,
              pwoccupyduration: 5,
              erroccupyduration: 20,
              areapersabnduration: 1,
              areapersabnnumlimit: 2,
              warnpersonnumlimit: 1,
              loiteringduration: 5,
              playphoneduration: 10,
              enterinduration: 5,
              linedpcenable: 0,
              linedpctime: 0,
              minpersonobjectheight: 0,
              minpersonobjectwidth: 0,
              maxpersonobjectheight: 1000,
              maxpersonobjectwidth: 1500,
              libid: "",
            },
            face: {
              faceopttype: "capoptbest",
              faceoptfasttime: 1,
              faceoptcyclevalue: 1,
              minsize: { height: 10, width: 10 },
            },
            extend: {
              enable: 1,
              config: [
                { safehatdetection: { sensitive: 80, reportrate: 0 } },
                { smokingdetection: { sensitive: 85, reportrate: 5 } },
              ],
            },
          },
          rules: [
            {
              id: 0,
              type: "polygon",
              direct: 1,
              event: ["safehatdetection", "smokingdetection"],
              points: [
                { x: "0", y: "0" },
                { x: "0", y: "10000" },
                { x: "10000", y: "10000" },
                { x: "10000", y: "0" },
              ],
            },
          ],
        },
        null,
        2,
      ),
  },
  {
    group: "Analysis Task Config",
    method: "GET",
    title: "Query tasks (specific channel)",
    path: "/api/v1/smart/config/task/all/{channelid}",
  },
  {
    group: "Analysis Task Config",
    method: "GET",
    title: "Query tasks (all channels)",
    path: "/api/v1/smart/config/task/all",
  },
  {
    group: "Data Retrieval",
    method: "POST",
    title: "Behavior analysis retrieval",
    path: "/api/v1/smart/search/bacap",
    description:
      "Main integration endpoint for historical behavior alarm records.",
    body: () => {
      const now = Date.now();
      return JSON.stringify(
        {
          page: 1,
          size: 15,
          channelid: [1, 2],
          starttime: now - 86400000,
          endtime: now,
          alarmtype: [
            4, 5, 6, 7, 16, 17, 18, 19, 20, 22, 33, 35, 45, 46, 57, 62, 63, 65,
            108, 114, 124, 182, 183, 184,
          ],
        },
        null,
        2,
      );
    },
  },
  {
    group: "Data Retrieval",
    method: "POST",
    title: "Face snapshot retrieval",
    path: "/api/v1/smart/search/structurecap",
    body: () => {
      const now = Date.now();
      return JSON.stringify(
        {
          page: 1,
          size: 15,
          captype: [11],
          channelid: [1, 2],
          starttime: now - 86400000,
          endtime: now,
          faceattr: { gender: 255, age: 255, glass: 255, mask: 255 },
        },
        null,
        2,
      );
    },
  },
  {
    group: "Data Retrieval",
    method: "POST",
    title: "Face comparison retrieval",
    path: "/api/v1/smart/search/facematch",
    body: () =>
      JSON.stringify(
        {
          page: 1,
          size: 15,
          channelid: [1, 2],
          starttime: Date.now() - 86400000,
          endtime: Date.now(),
          name: "",
          certificate_no: "",
          cmptype: 0,
          faceattr: { gender: 255, age: 255, glass: 255, mask: 255 },
        },
        null,
        2,
      ),
  },
  {
    group: "Data Retrieval",
    method: "POST",
    title: "Behavior + face comparison retrieval",
    path: "/api/v1/smart/search/bamatch",
    body: () =>
      JSON.stringify(
        {
          page: 1,
          size: 15,
          channelid: [1, 2],
          starttime: Date.now() - 86400000,
          endtime: Date.now(),
          name: "",
          certificate_no: "",
          cmptype: 1,
          alarmtype: [
            4, 5, 6, 7, 16, 17, 18, 19, 20, 22, 33, 35, 45, 46, 57, 62, 63, 65,
            108, 114, 124, 182, 183, 184,
          ],
        },
        null,
        2,
      ),
  },
  {
    group: "Algorithm Capabilities",
    method: "GET",
    title: "Query algorithm capabilities",
    path: "/api/v1/smart/config/ability",
    description:
      "Returns all detection algorithm types supported by this device.",
  },
];
