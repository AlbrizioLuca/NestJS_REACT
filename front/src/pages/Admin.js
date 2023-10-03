import React, { useState } from 'react';
import CRUD from '../components/CRUD';
import withAuthentication from '../hoc/withAuthentication';


// Définit les REGEX pour la validation des champs
const patterns = {
    name: "^(?![- ])[a-zA-ZÀ-ÿ -]*[^- ]$",    
    string: "^(?![- ])[a-zA-ZÀ-ÿ0-9 -]*[^- ]$",
    email: "^\\w[\\w.-_]*@\\w[\\w.-_]*(?:\\.\\w[\\w-]*)+$", 
    password: "^(?=.*[a-zà-ÿ])(?=.*[A-ZÀ-Ÿ])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-zÀ-ÿ\\d@$!%*?&.]{8,}$", 
    phone: '^\\d{10}$' 
};

// Définition des champs pour chaque table de la DB
const fieldsByParam = {
    users: [
        { name: 'firstname', label: 'Prénom', pattern: patterns.name },
        { name: 'lastname', label: 'Nom', pattern: patterns.name },
        { name: 'role', label: 'Rôle', pattern: patterns.name },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'password', label: 'Mot de passe', type: "password", pattern: patterns.password }
    ],
    candidates: [
        { name: 'gender', label: 'Genre', pattern: patterns.name },
        { name: 'firstname', label: 'Prénom', pattern: patterns.name },
        { name: 'lastname', label: 'Nom', pattern: patterns.name },
        { name: 'birthday', label: 'Naissance', type: 'date' },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'phone', label: 'Téléphone', pattern: patterns.phone },
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
        { name: 'domain', label: 'Domaine', pattern: patterns.name },
        { name: 'profession', label: 'Profession', pattern: patterns.name },
        { name: 'salary_pretentions', label: 'Prétentions salariales' },
        { name: 'city', label: 'Ville', pattern: patterns.name },
        { name: 'vehicle', label: 'Véhiculé', type: 'boolean' },
        { name: 'rqth', label: 'RQTH', type: 'boolean' },
    ],

    clients: [
        { name: 'enterprise', label: 'Entreprise', pattern: patterns.string },
        { name: 'city', label: 'Ville', pattern: patterns.name },
        { name: 'firstname', label: 'Prénom', pattern: patterns.name },
        { name: 'lastname', label: 'Nom', pattern: patterns.name },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'phone', label: 'Téléphone', pattern: patterns.phone },
    ],

    jobs: [
        { name:'domain', label: 'Domaine', pattern: patterns.name},
        { name: 'title', label: 'Titre', pattern: patterns.name},
        { name: 'description', label: 'Description'},
        { name: 'date_publication', label: 'Date de publication', type: 'date'},
        { name: 'date_beginning', label: 'Date de début', type: 'date'},
        { name: 'salary', label: 'Salaire'},
        { name: 'contract_type', label: 'Type de contrat', pattern: patterns.name},
        { name: 'contract_duration', label: 'Durée du contrat'},
        { name: 'city', label: 'Ville', pattern: patterns.name},
        { name: 'remote', label: 'Télétravail', type: 'boolean'},
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