import Field from '../components/Field';
import React, { useContext, useState } from 'react';
import jwt from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate(); // Récupération de la fonction navigate depuis le module react-router-dom

    const [FormData, setFormData] = useState({ // 
        email: '',
        password: ''
    })

    const handleChange = (event) => { // Fonction de gestion du changement de valeur des champs
        event.target.value = event.target.value.trim(); // Suppression des espaces avant et après la valeur
        setFormData({ // Mise à jour du state FormData avec la nouvelle valeur du champ modifié
            ...FormData,
            [event.target.name]: event.target.value
        });
    };

    // Définition des champs de données à afficher
    const dataFields = [
        { name: 'email', type: 'email', onChange: handleChange, label: 'Email', placeholder: `Votre email`, required: true },
        { name: 'password', type: 'password', onChange: handleChange, label: 'Mot de passe', placeholder: `Votre mot de passe`, required: true }
    ];

    // Création des composants Field à partir des champs de données
    const fieldComponents = dataFields.map((field, key) =>
        <Field
            key={key}
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
        />
    );

    // Vérifie les informations d'identification
    const handleLogin = () => {
        try {
            // Requete Post sur la route authentification
            fetch('http://localhost:5000/users/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FormData),
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    window.alert('Attention, les données renseignées ne sont pas valides.');
                }
            }).then(data => {
                if (data) {
                    // Récupération du token 
                    const token = data.token; 
                    // Décodage du token avec jwt-decode
                    const userObject = jwt(token);
                    // MAJ du state user avec les infos du user dans le token 
                    setUser(state => ({ ...userObject }));
                    // Stockage du token dans le localStorage
                    localStorage.setItem('token', token);
                    // si l'authentification est valide afficher message et redirection vers admin
                    window.alert('Connexion réussie.');
                    navigate('/admin');
                }
            })
        } catch (error) {
            console.log('Erreur lors de la requête API', error);
        }
    };

    return (
        <div className="login">
            <h2>Connexion</h2>
            {fieldComponents}
            <button onClick={handleLogin}>Se connecter</button>
        </div>
    );
}