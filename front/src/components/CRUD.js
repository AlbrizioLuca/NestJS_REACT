import React, { useState, useEffect } from 'react';
import editIcon from '../img/editer.png';
import cancelIcon from '../img/effacer.png';
import validIcon from '../img/valider.png';
import annulIcon from '../img/annuler.png';

const CrudComponent = (param) => {
    const [data, setData] = useState(null);
    const [creatingData, setCreatingData] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [newData, setNewData] = useState({ enterprise:'', firstname: '', lastname: '', email: '', phone: '' });
    const [selectedData, setSelectedData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
        const url = `http://localhost:3000/clients`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);



    const handleCreate = async () => {
        try {
        const url = `http://localhost:3000/${param}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            if (response.ok) {
                const data = await response.json();
                setData([...data, creatingData]);
            }
            setCreatingData({});
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = (event) => {
        setEditingData({ ...editingData, [event.target.name]: event.target.value });
    };

    const handleDelete = async (id) => {
    const url = `http://localhost:3000/${param}`;

        try {
            await fetch(url + `/${id}`, {
                method: 'DELETE',
            });
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (evt) => setNewData({ ...newData, [evt.target.name]: evt.target.value })


    return (
        <>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Entreprise</th>
                    <th>Prenom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Phone</th>
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
                                        <td>
                                            <input className="blinking-input" type="text" value={editingData.enterprise} onChange={(e) => setEditingData({ ...editingData, enterprise: e.target.value })} />
                                        </td>
                                            <input className="blinking-input" type="text" value={editingData.firstname} onChange={(e) => setEditingData({ ...editingData, firstname: e.target.value })} />
                                        <td>
                                            <input className="blinking-input" type="text" value={editingData.lastname} onChange={(e) => setEditingData({ ...editingData, lastname: e.target.value })} />
                                        </td>
                                        <td>
                                            <input className="blinking-input" type="text" value={editingData.email} onChange={(e) => setEditingData({ ...editingData, email: e.target.value })} />
                                        </td>
                                        <td>
                                            <input className="blinking-input" type="text" value={editingData.phone} onChange={(e) => setEditingData({ ...editingData, phone: e.target.value })} />
                                        </td>
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
                                        <td>{item.enterprise}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><img src={editIcon} alt="Update" onClick={() => selectedData && selectedData.id === item.id && setEditingData(item)} /></td>
                                        <td><img src={cancelIcon} alt="Delete" onClick={handleDelete} /></td>
                                    </>
                                )}
                            </tr>
                        ))}

                    {creatingData ? (
                        <tr>
                            <td></td>
                            <td>
                                <input type="text" placeholder="Entreprise" name="enterprise" onChange={handleChange} />
                            </td>
                            <td>
                                <input type="text" placeholder="Prénom" name="firstname" onChange={handleChange} />
                            </td>
                            <td>
                                <input type="text" placeholder="Nom" name="lastname" onChange={handleChange} />
                            </td>
                            <td>
                                <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                            </td>
                            <td>
                                <input type="password" placeholder="Téléphone" name="phone" onChange={handleChange} />
                            </td>
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