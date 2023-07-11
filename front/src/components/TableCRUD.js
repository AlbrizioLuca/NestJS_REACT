import React, { useEffect, useState } from 'react';
import editIcon from '../img/editer.png';
import cancelIcon from '../img/effacer.png';
import validIcon from '../img/valider.png';
import annulIcon from '../img/annuler.png';

const TableCRUD = () => {
    const [users, setUsers] = useState(null);
    const [creatingUser, setCreatingUser] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', password: '' });
    const [selectedUser, setSelectedUser] = useState({});

    const handleCreate = async () => {
        const url = 'http://localhost:3000/users';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                const user = await response.json();
                setUsers((users) => [...users, user]);
                setCreatingUser(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir modifier cet utilisateur ?')) {
            const url = `http://localhost:3000/users/${editingUser.id}`;
            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editingUser),
                });
                if (response.ok) {
                    const updatedUsers = users.map(user => user.id === editingUser.id ? editingUser : user);
                    setUsers(updatedUsers);
                    setEditingUser(null);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const HandleDelete = async () => {

        const url = `http://localhost:3000/users/${selectedUser.id}`;
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            try {
                const response = await fetch(url, { method: 'DELETE' });
                if (response.ok) {
                    setUsers((users) =>
                        users.filter((user) => user.id !== selectedUser.id),
                    );
                    setSelectedUser(null);
                }
            } catch (err) {
                console.error(err);
            }
        };
    }

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://localhost:3000/users';
            try {
                const response = await fetch(url);
                const users = await response.json();
                setUsers(users);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (evt) => setNewUser({ ...newUser, [evt.target.name]: evt.target.value })

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Prenom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Mot de Passe</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((user, index) => (
                            <tr key={index}>
                                {editingUser && editingUser.id === user.id ? (
                                    <>
                                        <td><input
                                            type="radio"
                                            name="userSelection"
                                            value={user.id}
                                            onChange={(event) => setSelectedUser(users.find(user => user.id === Number(event.target.value)))}
                                            checked={selectedUser && selectedUser.id === user.id}
                                        ></input>
                                        </td>
                                        <td>
                                            <input className="blinking-input" type="text" value={editingUser.firstname} onChange={(e) => setEditingUser({ ...editingUser, firstname: e.target.value })} />
                                        </td>
                                        <td>
                                            <input className="blinking-input" type="text" value={editingUser.lastname} onChange={(e) => setEditingUser({ ...editingUser, lastname: e.target.value })} />
                                        </td>
                                        <td>
                                            <input className="blinking-input" type="text" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                                        </td>
                                        <td>
                                            <input className="blinking-input" type="text" value={editingUser.password} onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })} />
                                        </td>
                                        <td><img src={validIcon} alt="Valider" onClick={handleUpdate} /></td>
                                        <td><img src={annulIcon} alt="Annuler" onClick={() => window.location.reload()} /></td>
                                    </>
                                ) : (
                                    <>
                                        <td><input
                                            type="radio"
                                            name="userSelection"
                                            value={user.id}
                                            onChange={(event) => setSelectedUser(users.find(user => user.id === Number(event.target.value)))}
                                            checked={selectedUser && selectedUser.id === user.id}
                                        ></input>
                                        </td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td><img src={editIcon} alt="Update" onClick={() => selectedUser && selectedUser.id === user.id && setEditingUser(user)} /></td>
                                        <td><img src={cancelIcon} alt="Delete" onClick={HandleDelete} /></td>
                                    </>
                                )}
                            </tr>
                        ))}

                    {creatingUser ? (
                        <tr>
                            <td></td>
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
                                <input type="password" placeholder="Mot de passe" name="password" onChange={handleChange} />
                            </td>
                            <td><img src={validIcon} alt="Valider" onClick={handleCreate} /></td>
                            <td><img src={annulIcon} alt="Annuler" onClick={() => window.location.reload()} /></td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
            <button onClick={() => setCreatingUser(true)}>Ajouter un utilisateur</button>
        </>
    );
};
export default TableCRUD;