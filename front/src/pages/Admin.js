import React, { useState } from 'react';
import CRUD from '../components/CRUD';
import withAuthentication from '../hoc/withAuthentication';


// Définit les REGEX pour la validation des champs
const patterns = {
    name: "^(?![- ])[a-zA-ZÀ-ÿ -]*[^- ]$",    
    enterprise: "^(?![- ])[a-zA-ZÀ-ÿ0-9 -]*[^- ]$",
    email: "^\\w[\\w.-_]*@\\w[\\w.-_]*(?:\\.\\w[\\w-]*)+$", 
    password: "^(?=.*[a-zà-ÿ])(?=.*[A-ZÀ-Ÿ])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-zÀ-ÿ\\d@$!%*?&.]{8,}$", 
    phone: '^\\d{10}$' 
};

// Définition des champs pour chaque table de la DB
const fieldsByParam = {
    users: [
        { name: 'firstname', label: 'Prénom', pattern: patterns.name },
        { name: 'lastname', label: 'Nom', pattern: patterns.name },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'password', label: 'Mot de passe', type: "password", pattern: patterns.password }
    ],
    candidates: [
        { name: 'firstname', label: 'Prénom', pattern: patterns.name },
        { name: 'lastname', label: 'Nom', pattern: patterns.name },
        {
            name: 'diploma', label: 'Diplome', type: 'select',
            options: [
                { value: 'Aucun diplome', label: 'Aucun diplome' },
                { value: 'BEP / CAP', label: 'BEP / CAP' },
                { value: 'Bac', label: 'Bac' },
                { value: 'Bac +2', label: 'Bac +2' },
                { value: 'Licence', label: 'Licence' },
                { value: 'Master', label: 'Master' }
            ]
        },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'phone', label: 'Téléphone', pattern: patterns.phone },
        { name: 'birthday', label: 'Naissance', type: 'date' },
        { name: 'vehicle', label: 'Véhiculé', type: 'boolean' }
    ],

    clients: [
        { name: 'enterprise', label: 'Entreprise', pattern: patterns.enterprise },
        { name: 'firstname', label: 'Prénom', pattern: patterns.name },
        { name: 'lastname', label: 'Nom', pattern: patterns.name },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'phone', label: 'Téléphone', pattern: patterns.phone }
    ]
};
function DisplayCRUD() {
    // Hook useState pour gérer l'état du paramètre
    const [param, setParam] = useState(Object.keys(fieldsByParam)?.[0] ?? "");
    // Récupère les champs en fonction du param
    const fields = fieldsByParam?.[param] ?? [];

    // Rendu du composant
    return (
        <>
            <h1>Bienvenue sur le tableau de bord de l'administrateur</h1>
            <CRUD param={param} fields={fields} setParam={setParam} fieldsByParam={fieldsByParam}></CRUD> 
        </>
    );
}

export default withAuthentication(DisplayCRUD);