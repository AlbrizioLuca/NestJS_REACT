import React, { useState, useEffect } from 'react';
import editIcon from '../img/editer.png';
import cancelIcon from '../img/effacer.png';
import validIcon from '../img/valider.png';
import annulIcon from '../img/annuler.png';

const CrudComponent = ({ param, fields, setParam }) => {
    const [data, setData] = useState(null);
    const [creatingData, setCreatingData] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [newData, setNewData] = useState([fields]);
    const [selectedData, setSelectedData] = useState({});

    console.log({ data });
    const url = `http://localhost:3000/${param}`;
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData(url);
    }, [url]);

    const handleCreate = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir créer cette donnée ?')) {
            // Vérification da la validité des données ..
            if (fields.every(field => {
                const value = typeof newData[field.name] === 'string' ? newData[field.name].trim() : newData[field.name];                // Utilise la regex spécifique du champ si elle existe, sinon la regex par défaut
                const checkPattern = new RegExp(field.pattern);
                return value && checkPattern.test(value);
            })) {
                try {
                    const cleanValue = {...newData};
                    fields.forEach(field => {
                        if (typeof cleanValue[field.name] === 'string') {
                            cleanValue[field.name] = cleanValue[field.name].trim();
                        }
                    })
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cleanValue),
                    });
                    if (response.ok) {
                        const item = await response.json();
                        setData((data) => [...data, item]);
                        setCreatingData(false);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert('Veuillez remplir tous les champs correctement.');
            }
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault()
        if (window.confirm('Êtes-vous sûr de vouloir modifier cette donnée ?')) {

            if (fields.every(field => {
                const value = typeof editingData[field.name] === 'string' ? editingData[field.name].trim() : editingData[field.name];
                const pattern = new RegExp(field.pattern);
                return value && pattern.test(value);
            })) {
                const cleanValue = {...editingData};
                    fields.forEach(field => {
                        if (typeof cleanValue[field.name] === 'string') {
                            cleanValue[field.name] = cleanValue[field.name].trim();
                        }
                    })
                    try {
                    const response = await fetch(url + `/${editingData.id}`,
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(cleanValue),
                        });
                    if (response.ok) {
                        const updatedData = data.map(item => item.id === editingData.id ? cleanValue : item);
                        setData(updatedData);
                        setEditingData(null);
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                alert('Veuillez remplir tous les champs correctement.');
            }
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette donnée ?')) {
            try {
                const response = await fetch(url + `/${selectedData.id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setData((data) =>
                        data.filter((item) => item.id !== selectedData.id),
                    );
                    setSelectedData(null);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <form>
            <table>
                <thead>
                    <tr>
                        <th>
                            <select value={param} onChange={(e) => setParam(e.target.value)}>
                                <option value="users">Utilisateurs</option>
                                <option value="clients">Clients</option>
                                <option value="candidates">Candidats</option>
                            </select>
                        </th>
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
                            <tr key={index}>
                                {editingData && editingData.id === item.id ? (
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
                                            <td key={index}>
                                                {field.type === 'boolean' ? (
                                                    <input
                                                        className="blinking-input"
                                                        type="checkbox"
                                                        name={field.name}
                                                        checked={editingData[field.name]}
                                                        onChange={(event) => setEditingData({ ...editingData, [field.name]: event.target.checked })}
                                                    />
                                                ) : (
                                                    <input
                                                        className="blinking-input"
                                                        type={field.type}
                                                        pattern={field.pattern}
                                                        title= {field.regexInfo}
                                                        value={editingData[field.name]}
                                                        onChange={(e) => setEditingData({ ...editingData, [field.name]: e.target.value })}
                                                    />
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            <img src={validIcon} alt="Valider" onClick={handleUpdate} />
                                        </td>
                                        <td>
                                            <img src={annulIcon} alt="Annuler" onClick={() => window.location.reload()} />
                                        </td>
                                    </>
                                ) : (
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
                                                required
                                            /> Oui / Non
                                        </>
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
        </form>
    );
};

export default CrudComponent;