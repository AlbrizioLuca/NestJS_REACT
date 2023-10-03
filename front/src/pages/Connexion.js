import Login from '../components/Login';
import SignUp from '../components/SignUp';
import React, { useState } from 'react';

export default function Connexion() {
  const [isLogin, setIsSignUp] = useState(false);

  // Menu toggle Login / Signup
  const toggleConnexion = () => {
    setIsSignUp(!isLogin);
  };

  const connexion = () => {
    if (isLogin) {
      return (
        <>
          <SignUp />
          <p> Vous avez déjà un compte ?{' '}
            <button onClick={toggleConnexion}>Se connecter</button>
          </p>
        </>
      );
    } else {
      return (
        <>
          <Login />
          <p> Pas encore de compte ?{' '}
            <button onClick={toggleConnexion}>S'inscrire</button>
          </p>
        </>
      );
    }
  }

  // Afficher la page de connexion/inscription
  return (
    <div className="main">
      {connexion()}
    </div>
  );
}