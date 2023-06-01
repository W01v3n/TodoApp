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
  rest.post("http://localhost:3000/api/users/login", async (_req, res, ctx) => {
    const { email, password } = await _req.json();
    if (email === "test@example.com" && password === "password123") {
      return res(ctx.status(200), ctx.json(user));
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: "Error in authentication." })
      );
    }
  }),

  rest.get("http://localhost:3000/api/auth/re", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ isAuthenticated: false }));
  }),

  rest.post(
    "http://localhost:3000/api/auth/refresh-token",
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "Refresh token not found. (Relax, it's just a mock..)",
        })
      );
    }
  ),
];

export const server = setupServer(...restHandlers);
