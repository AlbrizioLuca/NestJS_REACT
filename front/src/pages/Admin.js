import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import CRUD from '../components/CRUD';

export default function DisplayCRUD() {
    const [param, setParam] = useState("users");
    const [fields, setFields] = useState([]);

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
            { name: 'phone', label: 'Téléphone' }
        ],
        candidates: [
            { name: 'firstname', label: 'Prénom' },
            { name: 'lastname', label: 'Nom' },
            { name: 'diploma', label: 'Diplome' },
            { name: 'email', label: 'Email' },
            { name: 'phone', label: 'Téléphone' },
            { name: 'birthday', label: 'Naissance' },
            { name: 'vehicle', label: 'Véhiculé' }
        ],
    };

    useEffect(() => {
        setFields(fieldsByParam[param]);
    }, [param]);

    return (
        <>
            <NavBar></NavBar>
            <h1>Bienvenue sur le tableau de bord de l'administrateur</h1>
            <br/>
            <select value={param} onChange={(e) => setParam(e.target.value)}>
                <option value="users">Utilisateurs</option>
                <option value="clients">Clients</option>
                <option value="candidates">Candidats</option>
            </select>
            <br/>
            <CRUD param={param} fields={fields}></CRUD>
        </>
    );
}





