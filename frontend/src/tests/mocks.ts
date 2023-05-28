import { rest } from "msw";
import { setupServer } from "msw/node";

const user = {
  userId: 1,
  username: "TestUser",
  email: "test@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const restHandlers = [
  rest.post("http://localhost:3000/api/users/login", (req, res, ctx) => {
    console.log("Login request received, returning mock user");
    console.log(`Login request received, body: ${req.text}`);

    return res(ctx.status(200), ctx.json(user));
  }),

  rest.get("http://localhost:3000/api/auth/re", (req, res, ctx) => {
    console.log(
      "Authentication check request received, returning mock response"
    );
    return res(ctx.status(401), ctx.json({ isAuthenticated: false }));
  }),

  rest.post("http://localhost:3000/api/auth/refresh-token", (req, res, ctx) => {
    console.log("Token refresh request received, returning mock token");
    return res(
      ctx.status(401),
      ctx.json({
        message: "Refresh token not found. (Relax, it's just a mock..)",
      })
    );
  }),
];

export const server = setupServer(...restHandlers);
