import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import CRUD from '../components/CRUD';

const patterns = {
    name: "^(?![- ])[a-zA-ZÀ-ÿ -]*[^- ]$",
    enterprise: "^(?![- ])[a-zA-ZÀ-ÿ0-9 -]*[^- ]$",
    email: "^\\w[\\w.-_]*@\\w[\\w.-_]*(?:\\.\\w[\\w-]*)+$",
    password: "^(?=.*[a-zà-ÿ])(?=.*[A-ZÀ-Ÿ])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-zÀ-ÿ\\d@$!%*?&.]{8,}$",
    phone: '^\\d{10}$'
};

const fieldsByParam = {
    users: [
        { name: 'firstname', label: 'Prénom', pattern: patterns.name },
        { name: 'lastname', label: 'Nom', pattern: patterns.name },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'password', label: 'Mot de passe', type: "password", pattern: patterns.password }
    ],
    candidates: [
        { name: 'firstname', label: 'Prénom' , pattern: patterns.name },
        { name: 'lastname', label: 'Nom',  pattern: patterns.name },
        { name: 'diploma', label: 'Diplome', type:'select', 
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
        { name: 'enterprise', label: 'Entreprise' , pattern: patterns.enterprise },
        { name: 'firstname', label: 'Prénom' , pattern: patterns.name },
        { name: 'lastname', label: 'Nom' , pattern: patterns.name },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'phone', label: 'Téléphone', pattern: patterns.phone }
    ]
};

export default function DisplayCRUD() {
    const [param, setParam] = useState(Object.keys(fieldsByParam)?.[0] ?? "");
    const fields = fieldsByParam?.[param] ?? [];
    
    return (
        <>
            <NavBar></NavBar>
            <h1>Bienvenue sur le tableau de bord de l'administrateur</h1>
            <CRUD param={param} fields={fields} setParam={setParam}></CRUD>
        </>
    );
}