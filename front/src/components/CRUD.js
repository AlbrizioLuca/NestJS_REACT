// Importation des hooks et des icônes nécessaires
import React, { useState, useEffect } from 'react';
import { handleCreate, handleUpdate, handleDelete } from './OperationsCRUD';
import RadioInput from './RadioInput';
import Input from './Input';
import ValidateOrNot from './ValidateOrNot';
import editIcon from '../img/editer.png';
import cancelIcon from '../img/effacer.png';

// Déclaration du composant CrudComponent
const CrudComponent = ({ param, fields, setParam, fieldsByParam }) => {
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

    // Rendu du composant
    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>
                            {/* input select dynamique pour changer le param de l'url et récupèrer la data voulue */}
                            <select value={param} onChange={(e) => setParam(e.target.value)}>
                                {Object.keys(fieldsByParam).map((key) => (
                                    <option value={key}>{key}</option>
                                ))}
                            </select>
                        </th>
                        {/* Boucle sur les champs passés en params afin de remplir les en-têtes */}
                        {fields.map((field, index) => (
                            <th key={index}>{field.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) &&
                        data.map((item, index) => (
                                //! Partie MODIFICATION 
                            <tr key={index}>
                                {editingData && editingData.id === item.id ? ( 
                                    // Ajout de l'input radio pour pouvoir sélectionner la ligne à modifier
                                    <>                                    
                                        <td>
                                        <RadioInput
                                            name="dataSelection"
                                            value={item.id}
                                            checkedValue={selectedData && selectedData.id}
                                            onChange={(event) => setSelectedData(data.find(item => item.id === Number(event.target.value)))}
                                        />
                                        </td>
                                        {fields.map((field, index) => (
                                        // Boucle sur les champs pour retourner les différentes valeurs
                                            // Appel du component Input et gestion dans celui ci en fonction du type d'input
                                            <td key={index}>
                                                <Input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={editingData && editingData[field.name]}
                                                    onChange={(e) => setEditingData({ ...editingData, [field.name]: e.target.value })}
                                                    options={field.options}
                                                    showPassword={showPassword}
                                                    setShowPassword={setShowPassword}
                                                    className="blinking-input"
                                                />
                                            </td>
                                        ))}
                                        {/* Insertiondes icones en fin de ligne du tableau */}
                                        <ValidateOrNot
                                            handleAction={() => handleUpdate(url, fields, editingData, data, setData, setEditingData)}
                                            handleCancel={() => window.location.reload()}
                                        />
                                    </>
                                ) : (
                                    //! RESTITUTION DU FECTH
                                    <>
                                        <td>
                                            <RadioInput
                                                name="dataSelection"
                                                value={item.id}
                                                checkedValue={selectedData && selectedData.id}
                                                onChange={(event) => setSelectedData(data.find(item => item.id === Number(event.target.value)))}
                                            />
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
                                        <td>
                                            <img src={editIcon} alt="Update" onClick={() => selectedData && selectedData.id === item.id && setEditingData(item)} />
                                        </td>
                                        <td>
                                            <img 
                                                src={cancelIcon} 
                                                alt="Delete" 
                                                onClick={() => {
                                                    if (selectedData && selectedData.id) {
                                                        handleDelete(url, selectedData, setData, setSelectedData);
                                                    } else {
                                                        alert('Veuillez sélectionner une ligne avant de supprimer');
                                                    }
                                                }} 
                                            />
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    {creatingData ? (
                        //! CREATION NOUVELLE DATA
                        // Ajout d'une ligne pour la création d'une data suivant les memes principes de la modification mais sans l'animation
                        <tr>
                            <td></td>
                            {fields.map((field, index) => (
                                <td key={index}>
                                    <Input
                                        type={field.type}
                                        name={field.name}
                                        value={newData[field.name]}
                                        onChange={(e) => setNewData({ ...newData, [field.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })}
                                        options={field.options}
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                        placeholder={field.label}
                                    />
                                </td>
                            ))}
                            <ValidateOrNot
                                handleAction={() => handleCreate(url, fields, newData, setData, setCreatingData)}
                                handleCancel={() => window.location.reload()}
                            />
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