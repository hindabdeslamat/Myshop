import React from "react";
import products from "./ProductsList";
import { Link } from "react-router-dom";

export default function Home({ AjouterAuPanier }) {
  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#7F669D", marginTop: "40px", fontSize: "2rem", fontWeight: "700" }}>
        🛍️ Nos Produits
      </h2>
      <div className="container">
        {products.map(product => (
          <div className="card" key={product.id}>
            <div className="sale-div">{product.sales}%</div>
            <Link to={`/product/${product.id}`}>
              <img
                src={`pictures/${product.thumbnail}`}
                alt={product.title}
                className="image"
              />
            </Link>
            <div className="content">
              <h3>{product.title}</h3>
              <p className="price">{product.price}</p>
              <button className="buy" onClick={() => AjouterAuPanier(product)}>
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
