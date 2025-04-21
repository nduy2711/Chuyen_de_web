const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const upload = require("./upload");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(cors({ credentials: true, origin: "https://chuyen-de-web-fawn.vercel.app" }));
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

app.put("/api/update-product", upload.single("image"), async (req, res) => {
  try {
    const { id, name, description, price, status } = req.body;
    let imagePath = req.body.oldImage || "";

    if (req.file) {
      imagePath = "/uploads/images/" + req.file.filename;
    }

    const updatedProduct = await Necklace.findOneAndUpdate(
      { id },
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

app.get("/api/product/all", verifyToken, async (req, res) => {
  try {
    const products = await Necklace.find({});
    res.json(products);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", err);
    res.status(500).json({ error: "Lỗi server khi lấy sản phẩm" });
  }
});

// Route DELETE: Xóa sản phẩm theo id
app.delete("/api/product/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ID nhận được từ frontend:", id);
  try {
    const deletedProduct = await Necklace.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xóa." });
    }

    res.status(200).json({ message: "Đã xóa sản phẩm thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi xóa sản phẩm." });
  }
});

const bcrypt = require("bcryptjs");
const JWT_SECRET = "secret_key_very_secret"; // nên để vào biến môi trường khi deploy

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema, "Admins");

module.exports = Admin;

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = jwt.sign({ username: admin.username }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({ message: "Đăng nhập thành công", username: admin.username });
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
});

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Chưa đăng nhập" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
}

app.get("/api/auth/verify", verifyToken, (req, res) => {
  res.json({ success: true, message: "Token hợp lệ" });
});

app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Đã đăng xuất thành công" });
});
app.post("/api/product/search", async (req, res) => {
  const keyword = req.body.keyword;
  try {
    const results = await Necklace.find({
      name: { $regex: keyword, $options: "i" },
    });
    res.json(results);
  } catch (error) {
    console.error("Lỗi server khi tìm kiếm:", error);
    res.status(500).json({ error: "Lỗi server khi tìm kiếm" });
  }
});

app.listen(port, () => console.log(`Server đang chạy trên cổng ${port}!`));
