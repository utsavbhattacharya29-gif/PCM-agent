import type { SolveRequest, SolveResponse } from '../types';

/**
 * Base URL for the PCM Agent backend API.
 * Configured via VITE_API_URL environment variable with fallback to http://localhost:8000.
 */
const API_BASE_URL: string = (
  import.meta.env.VITE_API_URL || 'http://localhost:8000'
).replace(/\/+$/, '');

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Sends a science question to the PCM Agent backend for routing,
 * parsing, retrieval, symbolic solving, verification, and explanation.
 *
 * @param question The user's math, physics, or chemistry question
 * @returns The structured solve response
 */
export async function solveProblem(question: string): Promise<SolveResponse> {
  const trimmed = question.trim();
  if (!trimmed) {
    throw new ApiError('Please enter a question to solve.');
  }

  const payload: SolveRequest = { question: trimmed };

  try {
    const response = await fetch(`${API_BASE_URL}/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Intentionally do NOT leak raw Python traces, internal 500 dumps, or backend paths
      throw new ApiError('Something went wrong while solving this problem.', response.status);
    }

    const data = await response.json();

    // Basic structure validation
    if (!data || typeof data !== 'object') {
      throw new ApiError('Something went wrong while solving this problem.');
    }

    return data as SolveResponse;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    // Generic fallback for network disconnects, CORS, or connection refused
    throw new ApiError('Something went wrong while solving this problem.');
  }
}

/**
 * Checks if the backend service is reachable.
 */
export async function checkBackendConnection(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${API_BASE_URL}/docs`, {
      method: 'HEAD',
      signal: controller.signal,
    }).catch(() => null);
    clearTimeout(timeoutId);
    return response !== null && response.status < 500;
  } catch {
    return false;
  }
}

export { API_BASE_URL };
