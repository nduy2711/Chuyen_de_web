const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const upload = require("./upload");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const uri = "mongodb+srv://ninhducduy2004:duy@cluster0.rhsfm78.mongodb.net/Chuyen_De_Web?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

const necklaceSchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String,
  status: String,
  price: Number,
  description: String,
  category: String,
});

const Necklace = mongoose.model("Chuyen_De_Web", necklaceSchema, "Necklaces");

module.exports = Necklace;



app.get('/api/product/last-id', async (req, res) => {
  const { category } = req.query;

  if (!category) return res.status(400).json({ error: 'Thiếu category' });

  const prefixMap = {
    Gold: "GOLD",
    Silver: "SILV",
    Bronze: "BRON"
  };

  const prefix = prefixMap[category];
  if (!prefix) return res.status(400).json({ error: 'Category không hợp lệ' });

  try {
    const latest = await Necklace.findOne({ category })
      .sort({ id: -1 })
      .exec();

    let newNumber = 1;

    if (latest && latest.id) {
      const lastNumber = parseInt(latest.id.slice(-3));
      newNumber = lastNumber + 1;
    }

    const newId = `NL${prefix}${String(newNumber).padStart(3, '0')}`;
    res.json({ id: newId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server khi tạo ID' });
  }
});

app.post("/api/product/add", upload.single("image"), async (req, res) => {
  try {
    const { id, name, price, description, category } = req.body;
    const imagePath = req.file ? `/uploads/images/${req.file.filename}` : "";

    const newProduct = new Necklace({
      id,
      name,
      price,
      description,
      category,
      image: imagePath,
      status: "available",
    });

    await newProduct.save();
    res.status(201).json({ message: "Sản phẩm đã được thêm thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Đã xảy ra lỗi khi thêm sản phẩm." });
  }
});

app.get('/api/product/all', async (req, res) => {
  try {
    const products = await Necklace.find({});
    res.json(products);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", err);
    res.status(500).json({ error: "Lỗi server khi lấy sản phẩm" });
  }
});

app.delete('/api/product/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log("ID nhận được từ frontend:", id);
  try {
    const deletedProduct = await Necklace.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa.' });
    }

    res.status(200).json({ message: 'Đã xóa sản phẩm thành công.' });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm.' });
  }
});

app.post('/api/product/search', async (req, res) => {
  const keyword = req.body.keyword;
  try {
    const results = await Necklace.find({
      name: { $regex: keyword, $options: 'i' }
    });
    res.json(results);
  } catch (error) {
    console.error("Lỗi server khi tìm kiếm:", error);
    res.status(500).json({ error: 'Lỗi server khi tìm kiếm' });
  }
});




app.listen(port, () => console.log(`Server đang chạy trên cổng ${port}!`));
