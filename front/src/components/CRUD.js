// Importation des hooks et des icônes nécessaires
import React, { useState, useEffect } from 'react';
import editIcon from '../img/editer.png';
import cancelIcon from '../img/effacer.png';
import validIcon from '../img/valider.png';
import annulIcon from '../img/annuler.png';
import showPW from '../img/pw-show.png';
import hidePW from '../img/pw-hide.png';

// Déclaration du composant CrudComponent
const CrudComponent = ({ param, fields, setParam }) => {
    // Déclaration des états
    const [data, setData] = useState(null);
    const [creatingData, setCreatingData] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [newData, setNewData] = useState({ vehicle: false, ...fields });
    const [selectedData, setSelectedData] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // Url du back-end NEST JS
    const url = `http://localhost:5000/${param}`;

    // Récupération des données de l'URL via le hook useEffect 
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Utilisation de fetch pour faire une requête HTTP à l'URL
                const response = await fetch(url);
                // Conversion de la réponse en JSON
                const data = await response.json();
                // Mise à jour de l'état du composant avec les données récupérées
                setData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData(url);
    }, [url]);

    // Fonction pour créer une nouvelle donnée
    const handleCreate = async () => {
        // Demande de confirmation avant envoi en DB
        if (window.confirm('Êtes-vous sûr de vouloir créer cette donnée ?')) {
            // Vérifie la conformité des saisies via REGEX
            if (fields.every(field => {
                // Récupère la valeur du champ, et supprime des espaces en début et fin si 'string'
                const value = typeof newData[field.name] === 'string' ? newData[field.name].trim() : newData[field.name];
                // Check du pattern passé en param
                const checkPattern = new RegExp(field.pattern);
                // Retourne la valeur du champ testé. N.B: s'il s'agit d'un champ booléen pas de pattern donc return direct
                return (value && checkPattern.test(value)) || field.type === 'boolean';
            })) {
                try {
                    const cleanValue = { ...newData };
                    fields.forEach(field => {
                        // Suppression des espaces en début et fin pour les champs 'string'
                        if (typeof cleanValue[field.name] === 'string') {
                            cleanValue[field.name] = cleanValue[field.name].trim();
                        }
                    })
                    // Envoi la requête POST pour créer la nouvelle donnée
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cleanValue),
                    });
                    // Ajoute la nouvelle donnée à l'état du composant
                    if (response.ok) {
                        const item = await response.json();
                        setData((data) => [...data, item]);
                        setCreatingData(false);
                    }
                } catch (error) {
                    // Sinon affiche l'erreur en console
                    console.error(error);
                }
            } else {
                // Alerte en cas de non conformité des champs
                alert('Veuillez remplir tous les champs correctement.');
            }
        }
    };

    // Fonction pour mettre à jour une donnée existante
    const handleUpdate = async () => {
        // Demande de confirmation avant envoi en DB
        if (window.confirm('Êtes-vous sûr de vouloir modifier cette donnée ?')) {

            // Vérifie la conformité des saisies via REGEX
            if (fields.every(field => {
                // Récupère la valeur du champ, et suppression des espaces en début et fin si 'string'
                const value = typeof editingData[field.name] === 'string' ? editingData[field.name].trim() : editingData[field.name];
                // Check du pattern passé en param
                const pattern = new RegExp(field.pattern);
                // Retourne la valeur du champ testé. N.B: s'il s'agit d'un champ booléen pas de pattern donc return direct
                return (value && pattern.test(value)) || field.type === 'boolean';
            })) {
                const cleanValue = { ...editingData };
                fields.forEach(field => {
                    // Si le champ est de type 'string', suppression des espaces en début et fin
                    if (typeof cleanValue[field.name] === 'string') {
                        cleanValue[field.name] = cleanValue[field.name].trim();
                    }
                });
                try {
                    // Envoi de la requête PATCH pour modifier la donnée
                    const response = await fetch(url + `/${editingData.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cleanValue),
                    });

                    // Mise à jour de l'état du composant avec les données modifiées
                    if (response.ok) {
                        const updatedData = data.map(item => item.id === editingData.id ? cleanValue : item);
                        setData(updatedData);
                        setEditingData(null);
                    }
                } catch (err) {
                    // Sinon affiche l'erreur en console
                    console.error(err);
                }
            } else {
                // Alerte en cas de non conformité des champs
                alert('Veuillez remplir tous les champs correctement.');
            }
        }
    };

    // Fonction pour supprimer une donnée
    const handleDelete = async () => {
        // Demande de confirmation avant envoi en DB
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette donnée ?')) {
            try {
                const response = await fetch(url + `/${selectedData.id}`, {
                    method: 'DELETE',
                });
                // Supprime la data dans la DB
                if (response.ok) {
                    setData((data) =>
                        data.filter((item) => item.id !== selectedData.id),
                    );
                    setSelectedData(null);
                }
            } catch (error) {
                // Sinon affiche erreur dans la console
                console.error(error);
            }
        }
    };

    // Rendu du composant
    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>
                            {/* input select dynamique pour changer le param de l'url et récupèrer la data voulue */}
                            <select value={param} onChange={(e) => setParam(e.target.value)}>
                                <option value="users">Utilisateurs</option>
                                <option value="clients">Clients</option>
                                <option value="candidates">Candidats</option>
                            </select>
                        </th>
                        {/* Boucle sur les champs passés en params afin de remplir les en-têtes */}
                        {fields.map((field, index) => (
                            <th key={index}>{field.label}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) &&
                        data.map((item, index) => (
                                // Partie MODIFICATION 
                            <tr key={index}>
                                {editingData && editingData.id === item.id ? ( 
                                    // Ajout de l'input radio pour pouvoir sélectionner la ligne à modifier
                                    <>                                    
                                        <td><input 
                                            type="radio"
                                            name="dataSelection"
                                            value={item.id}
                                            onChange={(event) => setSelectedData(data.find(item => item.id === Number(event.target.value)))}
                                            checked={selectedData && selectedData.id === item.id}
                                        ></input>
                                        </td>
                                        {fields.map((field, index) => (
                                        // Boucle sur les champs pour retourner les différentes valeurs
                                                // Si le type est booléen l'input sera une checkbox
                                            <td key={index}>
                                                {field.type === 'boolean' ? (
                                                    <input
                                                        type="checkbox"
                                                        checked={editingData && editingData[field.name]}
                                                        onChange={(event) => setEditingData({ ...editingData, [field.name]: event.target.checked })}
                                                    />
                                                    // 
                                                ) : field.type === 'select' ? (
                                                    // Si le type est select l'input sera un select
                                                    <select
                                                        className="blinking-input"
                                                        value={editingData && editingData[field.name]}
                                                        onChange={(event) => setEditingData({ ...editingData, [field.name]: event.target.value })}
                                                    >
                                                        {field.options.map((option, index) => (
                                                            <option key={index} value={option.value}>{option.label}</option>
                                                        ))}
                                                    </select>
                                                ) : field.type === 'password' ? (
                                                    // Si le type est password l'input sera par défault de type input caché avec la possibilié de voir la saisie en cliquant sur l'img qui le suit 
                                                    <span className='password-input'>
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="blinking-input"
                                                            placeholder={field.label}
                                                            onChange={(event) => setNewData({ ...newData, [field.name]: event.target.value })}
                                                            required
                                                        />
                                                        <img
                                                            src={showPassword ? hidePW : showPW}
                                                            alt={showPassword ? 'Cacher' : 'Montrer'}
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        />
                                                    </span>
                                                ) : (
                                                    // sinon renvoi d'un input classique avec animation pour la modification
                                                    <input
                                                        className="blinking-input"
                                                        type={field.type}
                                                        value={editingData && editingData[field.name]}
                                                        onChange={(e) => setEditingData({ ...editingData, [field.name]: e.target.value })}
                                                    />
                                                )}
                                            </td>
                                        ))}
                                        {/* Insertiondes icones en fin de ligne du tableau */}
                                        <td>
                                            <img src={validIcon} alt="Valider" onClick={handleUpdate} />
                                        </td>
                                        <td>
                                            <img src={annulIcon} alt="Annuler" onClick={() => window.location.reload()} />
                                        </td>
                                    </>
                                ) : (
                                    // RESTITUTION DU FECTH
                                    <>
                                        <td><input
                                            type="radio"
                                            name="dataSelection"
                                            value={item.id}
                                            onChange={(event) => setSelectedData(data.find(item => item.id === Number(event.target.value)))}
                                            checked={selectedData && selectedData.id === item.id}
                                        ></input>
                                        </td>
                                        {fields.map((field, index) => {
                                            let value = item[field.name]
                                            if (field.name === 'password') {
                                                value = '••••••••';
                                            } else
                                                if (typeof value === 'boolean') {
                                                    value = value ? 'oui' : 'non';
                                                }
                                            return (
                                                <td key={index}>
                                                    {value}
                                                </td>
                                            )
                                        })}
                                        <td><img src={editIcon} alt="Update" onClick={() => selectedData && selectedData.id === item.id && setEditingData(item)} /></td>
                                        <td><img src={cancelIcon} alt="Delete" onClick={handleDelete} /></td>
                                    </>
                                )}
                            </tr>
                        ))}
                    {creatingData ? (
                        // Ajout d'une ligne pour la création d'une data suivant les memes principes de la modification mais sans l'animation
                        <tr>
                            <td></td>
                            {fields.map((field, index) => (
                                <td key={index}>
                                    {field.type === 'boolean' ? (
                                        <>
                                            <input
                                                type="checkbox"
                                                name={field.name}
                                                onChange={(event) => setNewData({ ...newData, [field.name]: event.target.checked })}
                                            /> Oui / Non
                                        </>
                                    ) : field.type === 'select' ? (
                                        <select
                                            name={field.name}
                                            onChange={(event) => setNewData({ ...newData, [field.name]: event.target.value })}
                                            required
                                        >
                                            {field.options.map((option, index) => (
                                                <option key={index} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'password' ? (
                                        <span className='password-input'>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder={field.label}
                                                onChange={(event) => setNewData({ ...newData, [field.name]: event.target.value })}
                                                required
                                            />
                                            <img
                                                src={showPassword ? hidePW : showPW}
                                                alt={showPassword ? 'Cacher' : 'Montrer'}
                                                onClick={() => setShowPassword(!showPassword)}
                                            />
                                        </span>
                                    ) : (
                                        <input
                                            type={field.type}
                                            placeholder={field.label}
                                            onChange={(event) => setNewData({ ...newData, [field.name]: event.target.value })}
                                            required
                                        />
                                    )}
                                </td>
                            ))}
                            <td><img src={validIcon} alt="Valider" onClick={handleCreate} /></td>
                            <td><img src={annulIcon} alt="Annuler" onClick={() => window.location.reload()} /></td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
            <button onClick={() => setCreatingData(true)}>Ajouter une donnée</button>
        </div>
    );
};

// Exportation du composant
export default CrudComponent;