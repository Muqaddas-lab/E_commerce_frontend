import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { FaEdit, FaTrash, FaPlus, FaSave } from "react-icons/fa";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    stock: 0,
    category: "other",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data.products)) setProducts(res.data.products);
      else setProducts([]);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };

  const saveProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", productForm.name);
      formData.append("description", productForm.description);
      formData.append("price", productForm.price);
      formData.append("stock", productForm.stock);
      formData.append("category", productForm.category);
      if (productForm.image) formData.append("image", productForm.image);

      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        setMessage("Product updated successfully ✅");
        setEditingProduct(null);
      } else {
        await API.post("/products", formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        setMessage("Product added successfully ✅");
      }

      setProductForm({ name: "", description: "", price: "", image: null, stock: 0, category: "other" });
      fetchProducts();

      // Auto hide message
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error saving product:", err);
      setMessage("Failed to save product ❌");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      image: null,
      stock: product.stock || 0,
      category: product.category || "other",
    });
    setMessage("");
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Product deleted successfully ✅");
      fetchProducts();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting product:", err);
      setMessage("Failed to delete product ❌");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div style={{ padding: "25px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px", fontSize: "28px", color: "#1e3a8a" }}>
        🛒 Admin Dashboard
      </h2>

      {message && <p style={{ textAlign: "center", color: message.includes("❌") ? "#dc2626" : "#16a34a", marginBottom: "20px", fontWeight: "600" }}>{message}</p>}

      {/* Product Form */}
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "12px", marginBottom: "30px", backgroundColor: "#f0f9ff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <h3 style={{ marginBottom: "15px", color: "#1e40af" }}>{editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}</h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <input type="text" placeholder="Name" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} style={{ flex: "1 1 45%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          <input type="text" placeholder="Description" value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} style={{ flex: "1 1 45%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          <input type="number" placeholder="Price" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} style={{ flex: "1 1 30%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          <input type="number" placeholder="Stock" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} style={{ flex: "1 1 30%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          <input type="text" placeholder="Category" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} style={{ flex: "1 1 30%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          <input type="file" onChange={e => setProductForm({ ...productForm, image: e.target.files[0] })} style={{ flex: "1 1 100%", padding: "8px" }} />
        </div>

        <button onClick={saveProduct} style={{ marginTop: "15px", padding: "10px 18px", border: "none", borderRadius: "8px", backgroundColor: "#2563eb", color: "#fff", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
          {editingProduct ? <><FaSave /> Update Product</> : <><FaPlus /> Add Product</>}
        </button>
      </div>

      {/* Product List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.length === 0 ? <p>No products found ❌</p> :
          products.map(p => (
            <li key={p._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", marginBottom: "12px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", transition: "0.3s" }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div>
                <strong style={{ color: "#1e3a8a", fontSize: "18px" }}>{p.name}</strong> - <span style={{ color: "#16a34a" }}>${p.price}</span> | Stock: {p.stock} | {p.category}
                <br /><small style={{ color: "#6b7280" }}>{p.description}</small>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => editProduct(p)} style={{ padding: "8px 12px", borderRadius: "6px", border: "none", backgroundColor: "#facc15", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => deleteProduct(p._id)} style={{ padding: "8px 12px", borderRadius: "6px", border: "none", backgroundColor: "#f87171", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", gap: "5px" }}>
                  <FaTrash /> Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
