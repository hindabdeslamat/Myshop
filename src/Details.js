import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "./ProductsList";

export default function Details({ AjouterAuPanier }) {
  const { id } = useParams();
  const produit = products.find((p) => p.id === parseInt(id));

  if (!produit) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>❌ Produit introuvable</h2>
        <Link to="/product" style={{ color: "blue" }}>⬅️ Retour aux produits</Link>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      gap: "2rem",
      padding: "2rem",
      flexWrap: "wrap",
      justifyContent: "center"
    }}>
      <div>
        <img
          src={`/pictures/${produit.thumbnail}`}
          alt={produit.title}
          style={{ width: "300px", borderRadius: "10px" }}
        />
      </div>
      <div>
        <h1>{produit.title}</h1>
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>💰 {produit.price}</p>
        <p>📉 Remise : {produit.sales}%</p>

        <button
          onClick={() => AjouterAuPanier(produit)}
          style={{
            backgroundColor: "#7F669D",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            marginRight: "10px"
          }}
        >
          🛒 Ajouter au panier
        </button>

        <Link to="/product" style={{
          textDecoration: "none",
          backgroundColor: "#ccc",
          padding: "10px 20px",
          borderRadius: "8px",
          color: "black"
        }}>
          ⬅️ Retour
        </Link>
      </div>
    </div>
  );
}
