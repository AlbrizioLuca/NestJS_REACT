import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Logout() {
  let { setUser } = useContext(AuthContext);

  useEffect(() => {
    // Fonction pour vider le cache et les traces d'authentification
    const clearAuthentication = () => {
        // Supprimer le token de la mémoire
        localStorage.removeItem('token');
        setUser(false);
      
        // Vider le cache
        if (caches && caches.keys) {
          caches.keys().then(function (keys) {
            keys.forEach(function (key) {
              caches.delete(key);
            });
          });
        }
      };

    // Appeler la fonction pour vider le cache et les traces d'authentification
    clearAuthentication();

    // Rediriger vers la page de connexion après 2 secondes
    setTimeout(() => {
        window.location.href = '/';
      }, 2000); // 
    });

  return (
    // Message de déconnexion
    <div className="main">
      Vous avez bien été déconnecté, <br/>
      Vous allez être redirigé vers la page de connexion.
    </div>
  );
}