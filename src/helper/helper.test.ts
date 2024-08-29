import { describe, expect, it } from "vitest";
import { isTokenExpired } from "./helper";

describe("Helper methods", () => {
  it.each`
    accessToken                                                                                                                                                                                                                                                                                                                                                                                        | expectedResult
    ${""}                                                                                                                                                                                                                                                                                                                                                                                              | ${true}
    ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInVzZXJuYW1lIjoidGVzdC1zdXBlcmFkbWluIiwicm91dGVzIjpbIi9kYXNoYm9hcmQiLCIvY3B1IiwiL3Byb2R1Y3QiLCIvbW9uaXRvciIsIi91cHMiLCIvdmVuZG9yIiwiL2FtYyIsIi91c2VyIiwiL2NhbGxfbG9nX3BhZ2UiLCIvYW1jX2NhbGxfbG9nX3BhZ2UiLCIvcmVwb3J0Il0sInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzIzMDk0NzYyLCJleHAiOjE3MjMwOTU2NjJ9.M3L4R6JzLilQdVGdWOM44us5yYbdfZEgXHgz7RUgA24"} | ${true}
  `(
    'should return ("$expectedResult")when the token is $accessToken',
    ({ accessToken, expectedResult }) => {
      expect(isTokenExpired(accessToken)).toEqual(expectedResult);
    }
  );
});
