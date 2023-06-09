import { rest } from "msw";
import { setupServer } from "msw/node";

const loggedInUser = {
  userId: 1,
  username: "TestUser",
  email: "test@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const registeringUser = {
  userId: 1,
  username: "Mr.Tester",
  email: "testregister@example.com",
  password_hash:
    "$argon2id$v=19$m=65536,t=3,p=4$IOoj5cb1oogts/0YR/1HAQ$8Xj/AEsLO09h02mdwd6ffULZiUYBW802cJtX4QwWoss",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const todoLists = [
  {
    createdAt: new Date(),
    id: 1,
    name: "Tests List",
    updatedAt: new Date(),
    userId: 1,
  },
  {
    createdAt: new Date(),
    id: 2,
    name: "Tests List2",
    updatedAt: new Date(),
    userId: 1,
  },
];

const restHandlers = [
  rest.post("http://localhost:3000/api/users/login", async (_req, res, ctx) => {
    const { email, password } = await _req.json();
    if (email === "test@example.com" && password === "password123") {
      return res(ctx.status(200), ctx.json(loggedInUser));
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: "Error in authentication." })
      );
    }
  }),

  rest.post(
    "http://localhost:3000/api/users/register",
    async (_req, res, ctx) => {
      const { username, email, password } = await _req.json();
      if (
        email === "testregister@example.com" &&
        password === "password123" &&
        username === "Mr.Tester"
      ) {
        return res(ctx.status(201), ctx.json(registeringUser));
      } else {
        console.log("ERROR IN REGISTRATION!");

        return res(
          ctx.status(401),
          ctx.json({ message: "Error in registration." })
        );
      }
    }
  ),

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

  rest.get("http://localhost:3000/api/lists", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoLists));
  }),
];

export const server = setupServer(...restHandlers);
