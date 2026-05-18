import { ENDPOINTS } from "./endpoints.js";
import { getConfig } from "./config.js";

export function schemaFromValue(value) {
  if (Array.isArray(value)) {
    const itemSchema = value.length
      ? schemaFromValue(value[0])
      : { type: "string" };
    return { type: "array", items: itemSchema };
  }
  if (value === null) return { type: "string", nullable: true };
  switch (typeof value) {
    case "number":
      return Number.isInteger(value)
        ? { type: "integer", format: "int64" }
        : { type: "number" };
    case "boolean":
      return { type: "boolean" };
    case "object": {
      const properties = {};
      for (const [key, child] of Object.entries(value)) {
        properties[key] = schemaFromValue(child);
      }
      return { type: "object", properties, additionalProperties: true };
    }
    default:
      return { type: "string" };
  }
}

export function buildExampleBody(endpoint) {
  if (typeof endpoint.body !== "function") return null;
  const bodyText = endpoint.body();
  if (bodyText == null) return null;
  try {
    return JSON.parse(bodyText);
  } catch {
    return bodyText;
  }
}

export function buildPathSpec(endpoint) {
  const method = endpoint.method.toLowerCase();
  const path = endpoint.path;
  const exampleBody = buildExampleBody(endpoint);
  const operation = {
    tags: [endpoint.group],
    summary: endpoint.title,
    description: endpoint.description || "",
    operationId: endpoint.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, ""),
    parameters: [],
    responses: { 200: { description: "Successful response" } },
  };

  const pathParams = Array.from(path.matchAll(/\{([^}]+)\}/g)).map((m) => m[1]);
  for (const name of pathParams) {
    operation.parameters.push({
      name,
      in: "path",
      required: true,
      schema: { type: "string" },
      description: `Path parameter ${name}`,
    });
  }

  if (endpoint.isUpload) {
    operation.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["file"],
            properties: { file: { type: "string", format: "binary" } },
          },
        },
      },
    };
  } else if (exampleBody !== null) {
    const schema =
      typeof exampleBody === "object"
        ? schemaFromValue(exampleBody)
        : { type: "string" };
    operation.requestBody = {
      required: method !== "get" && method !== "delete",
      content: { "application/json": { schema, example: exampleBody } },
    };
  }

  if (endpoint.responseExamples) {
    operation.responses = {};
    for (const [status, response] of Object.entries(
      endpoint.responseExamples,
    )) {
      operation.responses[status] = {
        description: response.description,
        content: { "application/json": { example: response.example } },
      };
    }
  }

  return { path, method, operation };
}

export function buildSpec() {
  const config = getConfig();
  const paths = {};
  for (const endpoint of ENDPOINTS) {
    const built = buildPathSpec(endpoint);
    if (!paths[built.path]) paths[built.path] = {};
    paths[built.path][built.method] = built.operation;
  }
  return {
    openapi: "3.0.3",
    info: {
      title: "Smartbox OpenAPI",
      version: "1.0.0",
      description: "Model: ECS-504B-SF-HD",
    },
    servers: [{ url: config.baseUrl || "/", description: "Device base URL" }],
    components: {
      securitySchemes: {
        tokenAuth: { type: "apiKey", in: "header", name: "Authorization" },
      },
    },
    security: [{ tokenAuth: [] }],
    paths,
  };
}
