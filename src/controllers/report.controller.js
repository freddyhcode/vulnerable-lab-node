// [A03] PDF Generation DoS (Resource Exhaustion)
let serverLoad = 0;
export const reports = async (req, res) => {
  serverLoad += 50;

  const delay = 100 + serverLoad;

  await new Promise((r) => setTimeout(r, delay));

  setTimeout(() => {
    if (serverLoad > 0) serverLoad -= 50;
  }, 2000);

  res.send(`PDF Content Generated. Latency: ${delay}ms`);
};
