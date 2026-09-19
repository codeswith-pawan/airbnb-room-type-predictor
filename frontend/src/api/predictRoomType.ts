import type { PredictRequest, PredictResponse } from "../types/property";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Sends property details to the FastAPI Random Forest backend and
 * returns the predicted room type. Throws ApiError for backend/validation
 * failures and a plain Error for network-level failures.
 */
export async function predictRoomType(data: PredictRequest): Promise<PredictResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      "Could not reach the prediction server. Confirm the FastAPI backend is running."
    );
  }

  if (!response.ok) {
    let detail = `Request failed with status ${response.status}.`;
    try {
      const body = await response.json();
      if (body?.detail) {
        detail = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
      }
    } catch {
      // Response body wasn't JSON — fall back to the status message above.
    }
    throw new ApiError(detail, response.status);
  }

  const result = (await response.json()) as PredictResponse;

  if (!result || typeof result.prediction === "undefined") {
    throw new ApiError("The server response did not include a prediction.");
  }

  return result;
}

/**
 * Lightweight reachability check used by the header status indicator.
 * Hits the API root rather than /predict so it never sends a payload.
 */
export async function checkApiHealth(signal?: AbortSignal): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/`, { method: "GET", signal });
    return response.ok;
  } catch {
    return false;
  }
}

export { API_URL };
