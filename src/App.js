import './App.css';
import { Link, Routes, Route } from "react-router-dom";
import Home from './Home';
import Blog from './Blog';
import About from './About';
import Navbar from './Navbar';
import Details from './Details';
import Footer from './Footer';
import Afficher from './Afficher';
import { useState } from 'react';

function App() {
  const [panier, setPanier] = useState([]);

  function ajouterAuPanier(produit) {
    const existeDeja = panier.some(item => item.id === produit.id);
    if (!existeDeja) {
      setPanier([...panier, produit]);
    } else {
      alert("Ce produit existe déjà dans le panier.");
    }
  }

  function supprimerDuPanier(id) {
    setPanier(panier.filter(item => item.id !== id));
  }

  return (
    <div className="App">
      
<Navbar />
      <div className="Global-Container">
        <div className="routes-container">
          <Routes>
            <Route path="/" element={<Home AjouterAuPanier={ajouterAuPanier} />} />
            <Route path="/product" element={<Afficher AjouterAuPanier={ajouterAuPanier} />} />
            <Route path="/product/:id" element={<Details AjouterAuPanier={ajouterAuPanier} />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
        

        <aside className="panier">
          <h3>🛒 Panier</h3>
          {panier.length === 0 ? (
            <p>Aucun produit ajouté.</p>
          ) : (
            <ul>
              {panier.map(item => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <button onClick={() => supprimerDuPanier(item.id)}>Supprimer</button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
      <Footer />
    </div>
  );
}

export default App;
// Note: Ensure that the CSS file is correctly linked in your project for styles to apply.