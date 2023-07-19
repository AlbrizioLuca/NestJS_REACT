import React, { useState, useEffect } from 'react';
import editIcon from '../img/editer.png';
import cancelIcon from '../img/effacer.png';
import validIcon from '../img/valider.png';
import annulIcon from '../img/annuler.png';

const CrudComponent = ({ param, fields }) => {
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
            try {
                console.log(newData)
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newData),
                });
                if (response.ok) {
                    const item = await response.json();
                    setData((data) => [...data, item]);
                    setCreatingData(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleUpdate = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir modifier cette donnée ?')) {
            try {
                const response = await fetch(url + `/${editingData.id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editingData),
                    });
                if (response.ok) {
                    const updatedData = data.map(item => item.id === editingData.id ? editingData : item);
                    setData(updatedData);
                    setEditingData(null);
                }
            } catch (err) {
                console.error(err);
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
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
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
                                                    <>
                                                        <input
                                                            type="radio"
                                                            name={field.name}
                                                            value="oui"
                                                            checked={editingData[field.name] === true}
                                                            onChange={(e) => setEditingData({ ...editingData, [field.name]: e.target.value === 'oui' })}
                                                        /> Oui
                                                        <input
                                                            type="radio"
                                                            name={field.name}
                                                            value="non"
                                                            checked={editingData[field.name] === false}
                                                            onChange={(e) => setEditingData({ ...editingData, [field.name]: e.target.value === 'oui' })}
                                                        /> Non
                                                    </>
                                                ) : (
                                                    <input
                                                        className="blinking-input"
                                                        type={field.type}
                                                        value={field.type === 'boolean' ? (editingData[field.name] ? 'oui' : 'non') : editingData[field.name]}
                                                        onChange={(e) => setEditingData({ ...editingData, [field.name]: e.target.value })}
                                                    />
                                                )}
                                            </td>
                                        ))}
                                        <td><img src={validIcon} alt="Valider" onClick={handleUpdate} /></td>
                                        <td><img src={annulIcon} alt="Annuler" onClick={() => window.location.reload()} /></td>
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
                                                type="radio"
                                                name={field.name}
                                                value="oui"
                                                onChange={(event) => setNewData({ ...newData, [field.name]: event.target.value === 'oui' })}
                                                required
                                            /> Oui
                                            <input
                                                type="radio"
                                                name={field.name}
                                                value="non"
                                                onChange={(event) => setNewData({ ...newData, [field.name]: event.target.value === 'oui' })}
                                                required
                                            /> Non
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
        </>
    );
};

export default CrudComponent;