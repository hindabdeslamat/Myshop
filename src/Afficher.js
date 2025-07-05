import React from "react";
import products from "./ProductsList";
import { Link } from "react-router-dom";

export default function Afficher({ AjouterAuPanier }) {
  return (
    <div className="container">
      {products.map((elt) => (
        <div className="card" key={elt.id}>
          <div className="sale-div">{elt.sales}</div>

          <Link to={`/product/${elt.id}`}>
            <img
              src={`pictures/${elt.thumbnail}`}
              alt={elt.title}
              className="image"
              style={{ width: '80%', height: '180px', objectFit: 'cover', borderRadius: '10px' }}
            />
          </Link>

          <div className="content">
            <h3>{elt.title}</h3>
            <p className="price">{elt.price} €</p>

            <button
              type="button"
              className="buy"
              onClick={() => AjouterAuPanier(elt)}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
