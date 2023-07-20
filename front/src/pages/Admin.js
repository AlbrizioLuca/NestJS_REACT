import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import CRUD from '../components/CRUD';

const fieldsByParam = {
    users: [
        { name: 'firstname', label: 'Prénom' },
        { name: 'lastname', label: 'Nom' },
        { name: 'email', label: 'Email' },
        { name: 'password', label: 'Mot de passe' }
    ],
    clients: [
        { name: 'enterprise', label: 'Entreprise' },
        { name: 'firstname', label: 'Prénom' },
        { name: 'lastname', label: 'Nom' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Téléphone',  }
    ],
    candidates: [
        { name: 'firstname', label: 'Prénom' },
        { name: 'lastname', label: 'Nom' },
        { name: 'diploma', label: 'Diplome' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Téléphone', pattern: /^(?:0|\+33 ?|0?0?33 ?|)([1-9] ?(?:[0-9] ?){8})$/i},
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