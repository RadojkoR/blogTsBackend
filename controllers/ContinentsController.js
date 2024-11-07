const db = require("../database/config");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads");

// Konfigurišite multer za čuvanje fajlova
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/radojko/blog/public/images/"); // Folder u koji će se fajlovi sačuvati
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Dodajemo jedinstveno ime fajlu
  },
});

// Inicijalizujemo multer sa definisanom konfiguracijom
const upload = multer({ storage: storage });

// Dohvatanje kontinenata
const index = async (req, res) => {
  try {
    const [continentsData] = await db.query("SELECT * FROM continents");
    res.json(continentsData);
  } catch (error) {
    console.error("Error Fetching Continents", error);
    res.status(500).json({ message: "Database connection error" });
  }
};

// Kreiranje novog kontinenta
const create = async (req, res) => {
  const { continent_name } = req.body;
  const continent_img = req.file ? req.file.filename : null;

  console.log("Received data:", req.body, req.file); // Prikazuje podatke i fajl

  if (!continent_name || !continent_img) {
    return res.status(400).json({ message: "Continent name and image are required." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO continents (continent_name, continent_img) VALUES (?, ?)",
      [continent_name, continent_img]
    );
    res.json({ continentId: result.insertId, continent_name, continent_img });
  } catch (error) {
    console.error("Error creating continent:", error);
    res.status(500).json({ message: "Database connection error", error: error.message });
  }
};

// Brisanje kontinenta
const deleteContinent = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM continents WHERE continent_id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Continent not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting continent", error);
    res.status(500).json({ message: "Database connection error" });
  }
};

// Izvoz funkcija i `upload` middleware-a
module.exports = {
  index,
  create: [upload.single("imgFile"), create], // Dodajemo multer kao middleware pre `create` funkcije
  deleteContinent,
};
