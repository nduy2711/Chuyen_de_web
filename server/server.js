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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const uri =
  "mongodb+srv://ninhducduy2004:duy@cluster0.rhsfm78.mongodb.net/Chuyen_De_Web?retryWrites=true&w=majority&appName=Cluster0";

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

app.get("/api/product/last-id", async (req, res) => {
  const { category } = req.query;

  if (!category) return res.status(400).json({ error: "Thiếu category" });

  const prefixMap = {
    Gold: "GOLD",
    Silver: "SILV",
    Bronze: "BRON",
  };

  const prefix = prefixMap[category];
  if (!prefix) return res.status(400).json({ error: "Category không hợp lệ" });

  try {
    const latest = await Necklace.findOne({ category }).sort({ id: -1 }).exec();

    let newNumber = 1;

    if (latest && latest.id) {
      const lastNumber = parseInt(latest.id.slice(-3));
      newNumber = lastNumber + 1;
    }

    const newId = `NL${prefix}${String(newNumber).padStart(3, "0")}`;
    res.json({ id: newId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server khi tạo ID" });
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

app.get("/api/list-product", async (req, res) => {
  try {
    const products = await Necklace.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách sản phẩm" });
  }
});

app.put("/api/update-product", upload.single("image"), async (req, res) => {
  try {
    const { id, name, description, price, status } = req.body;

    // Sử dụng oldImage nếu không có ảnh mới
    let imagePath = req.body.oldImage || ""; // Đảm bảo rằng nếu không có ảnh mới, giữ lại ảnh cũ.

    // Kiểm tra nếu có ảnh mới thì cập nhật ảnh
    if (req.file) {
      imagePath = "/uploads/images/" + req.file.filename;
    }

    // Tìm và cập nhật sản phẩm
    const updatedProduct = await Necklace.findOneAndUpdate(
      { id }, // Nếu id là chuỗi, bạn có thể dùng ObjectId nếu cần
      {
        name,
        description,
        price,
        status,
        image: imagePath,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res
      .status(200)
      .json({ message: "Cập nhật thành công", product: updatedProduct });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật sản phẩm" });
  }
});

app.listen(port, () => console.log(`Server đang chạy trên cổng ${port}!`));
