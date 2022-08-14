declare namespace Express {
  interface Request {
    user?: { username: string; id: number }
  }
}
