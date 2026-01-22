// [A05] Login Timing Attack
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@empresa.com") {
    await new Promise((r) => setTimeout(r, 300));
    if (password === "123456") {
      return res.json({ token: "admin_token_123" });
    }
  } else {
    await new Promise((r) => setTimeout(r, 20));
  }

  return res.status(401).json({ error: "Invalid credentials" });
};

// [A03] Register Rate Limit Bypass
const registerIPs = {};
export const register = (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!registerIPs[ip]) registerIPs[ip] = 0;
  registerIPs[ip]++;

  if (registerIPs[ip] > 5) {
    return res.status(429).json({ error: "Too many accounts from this IP" });
  }

  return res.status(201).json({ message: "User created" });
};
