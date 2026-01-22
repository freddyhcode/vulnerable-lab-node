// [OWASP A03:2025] Inventory Race Condition
let stock = 1;
export const buy = async (req, res) => {
  if (stock > 0) {
    await new Promise((r) => setTimeout(r, 50));
    stock--;
    return res.json({ message: "Item purchased!" });
  }
  return res.status(400).json({ error: "Out of stock" });
};
