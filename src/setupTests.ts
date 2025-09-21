// global test setup for Testing Library + MSW
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Reset handlers after each test (so tests are isolated).
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
