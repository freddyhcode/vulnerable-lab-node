const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// [A05] Login Timing Attack
// Endpoint: /api/v1/user/login
app.post('/api/v1/user/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@empresa.com') {
    await new Promise(r => setTimeout(r, 300)); 
    if (password === '123456') {
      return res.json({ token: "admin_token_123" });
    }
  } else {
    await new Promise(r => setTimeout(r, 20)); 
  }
  
  return res.status(401).json({ error: "Invalid credentials" });
});

// [A03] Inventory Race Condition
// Endpoint: /api/v1/shop/buy
let stock = 1;
app.post('/api/v1/shop/buy', async (req, res) => {
  if (stock > 0) {
    await new Promise(r => setTimeout(r, 50));
    stock--; 
    return res.json({ message: "Item purchased!" });
  }
  return res.status(400).json({ error: "Out of stock" });
});

// [A03] Register Rate Limit Bypass
// Endpoint: /api/v1/user/register
const registerIPs = {};
app.post('/api/v1/user/register', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  if (!registerIPs[ip]) registerIPs[ip] = 0;
  registerIPs[ip]++;

  if (registerIPs[ip] > 5) {
    return res.status(429).json({ error: "Too many accounts from this IP" });
  }

  return res.status(201).json({ message: "User created" });
});

// [A03] PDF Generation DoS (Resource Exhaustion)
// Endpoint: /api/v1/reports
let serverLoad = 0;
app.get('/api/v1/reports', async (req, res) => {
  serverLoad += 50; 
  
  const delay = 100 + serverLoad;
  
  await new Promise(r => setTimeout(r, delay));
  
  setTimeout(() => { if(serverLoad > 0) serverLoad -= 50; }, 2000);
  
  res.send(`PDF Content Generated. Latency: ${delay}ms`);
});

app.listen(port, () => {
  console.log(`Vulnerable Lab running on http://localhost:${port}`);
});
