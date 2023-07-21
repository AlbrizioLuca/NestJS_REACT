import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import CRUD from '../components/CRUD';

const patterns = {
    name: "^(?![- ])[a-zA-ZÀ-ÿ -]*[^- ]$",
    enterprise: "^(?![- ])[a-zA-ZÀ-ÿ0-9 -]*[^- ]$",
    email: "^(?![- ])[a-zA-ZÀ-ÿ0-9@_.-]*[^- ]$",
    password: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$",
    phone: '^\\d{10}$'
};

const fieldsByParam = {
    users: [
        { name: 'firstname', label: 'Prénom', pattern: patterns.name },
        { name: 'lastname', label: 'Nom', pattern: patterns.name },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'password', label: 'Mot de passe', pattern: patterns.password }
    ],
    clients: [
        { name: 'enterprise', label: 'Entreprise' , pattern: patterns.enterprise },
        { name: 'firstname', label: 'Prénom' , pattern: patterns.name },
        { name: 'lastname', label: 'Nom' , pattern: patterns.name },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'phone', label: 'Téléphone', pattern: patterns.phone }
    ],
    candidates: [
        { name: 'firstname', label: 'Prénom' , pattern: patterns.name },
        { name: 'lastname', label: 'Nom',  pattern: patterns.name },
        { name: 'diploma', label: 'Diplome' },
        { name: 'email', label: 'Email', pattern: patterns.email },
        { name: 'phone', label: 'Téléphone', pattern: patterns.phone },
        { name: 'birthday', label: 'Naissance', type: 'date' },
        { name: 'vehicle', label: 'Véhiculé' , type: 'boolean' }
    ],
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