import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const PRODUCTS_FILE = "./data/products.json";
const FAVORITES_FILE = "./data/favorites.json";

/* -------- TOOTED -------- */

// Kõik tooted
app.get("/api/products", (req, res) => {
  const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE));
  res.json(data.products);
});

// Üks toode ID järgi
app.get("/api/products/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE));

  const product = data.products.find(
    p => p.id === Number(req.params.id)
  );

  if (!product) return res.status(404).json({ error: "Not found" });

  res.json(product);
});

// Kategooriad
app.get("/api/categories", (req, res) => {
  const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE));

  const categories = [
    ...new Set(data.products.map(p => p.category))
  ];

  res.json(categories);
});

// Filtreerimine
app.get("/api/products/category/:cat", (req, res) => {
  const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE));

  const filtered = data.products.filter(
    p => p.category === req.params.cat
  );

  res.json(filtered);
});

/* -------- LEMMIKUD -------- */

function readFavorites() {
  if (!fs.existsSync(FAVORITES_FILE)) {
    fs.writeFileSync(FAVORITES_FILE, "{}");
  }
  return JSON.parse(fs.readFileSync(FAVORITES_FILE));
}

function writeFavorites(data) {
  fs.writeFileSync(FAVORITES_FILE, JSON.stringify(data, null, 2));
}

// Vaata lemmikuid
app.get("/api/customers/:id/favorites", (req, res) => {
  const favs = readFavorites();
  res.json(favs[req.params.id] || []);
});

// Lisa lemmik
app.post("/api/customers/:id/favorites", (req, res) => {
  const favs = readFavorites();
  const { productId } = req.body;

  if (!favs[req.params.id]) {
    favs[req.params.id] = [];
  }

  if (!favs[req.params.id].includes(productId)) {
    favs[req.params.id].push(productId);
  }

  writeFavorites(favs);
  res.json({ success: true });
});

// Kustuta lemmik
app.delete("/api/customers/:id/favorites/:pid", (req, res) => {
  const favs = readFavorites();

  favs[req.params.id] =
    (favs[req.params.id] || []).filter(
      id => id !== Number(req.params.pid)
    );

  writeFavorites(favs);
  res.json({ success: true });
});

/* -------- SERVER -------- */

app.listen(PORT, () => {
  console.log("Server töötab: http://localhost:" + PORT);
});
