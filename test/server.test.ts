
import * as supertest from "supertest";
const request = supertest("http://localhost:3001");

describe("GET /random-url", () => {
  it("should return 500", () => {
    request.get("/users")
      .expect(500);
  });
});