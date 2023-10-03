import Field from './Field';
import React, { useState } from 'react'; 

export default function SignUp() { 
    const [formData, setFormData] = useState({ // Déclaration du state formData avec les champs username, email, password et isAdmin
        username: '',
        email: '',
        password: '',
        isAdmin: false
    })

    const handleChange = (event) => { 
        event.target.value = event.target.value.trim(); // Suppression des espaces avant et après la valeur
        setFormData({ // Mise à jour du state formData avec la nouvelle valeur du champ modifié
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Définition des champs de données à afficher
    const dataFields = [ 
        { name: 'firstname', type: 'text', onChange: handleChange, label: 'Prénom', placeholder: `Saisir votre prénom`, required: true },
        { name: 'lastname', type: 'text', onChange: handleChange, label: 'Nom', placeholder: `Saisir votre nom`, required: true },
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

    // Crée un nouvel utilisateur avec via le formulaire
    const handleSignUp = async () => { // Fonction de gestion de l'inscription
        try {
            // Requete Post sur la route authentification
            const response = await fetch('http://localhost:5000/users/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Spécification du type de contenu de la requête
                },
                body: JSON.stringify(formData), // Conversion du formData en JSON et envoi dans le corps de la requête
            });

            console.log(response);

            if (response.ok) { 
                // si l'authentification est valide afficher message et redirection vers upload
                window.alert('Confirmation de création. \n Vous allez être redirigé vers la page de connexion.');
                window.location.href = '/';
            } else {
                // Sinon afficher un message d'erreur
                window.alert('Attention, veuillez remplir correctement les champs du formulaire.');
            }
        } catch (error) {
            console.log('Erreur lors de la requête API: ', error);
        }
    };

    // Afficher la page de connexion/inscription
    return (
        <div className="signup">
            <h2>Inscription</h2>
            {fieldComponents} 
            <button onClick={handleSignUp}>S'inscrire</button> 
        </div>
    );
}