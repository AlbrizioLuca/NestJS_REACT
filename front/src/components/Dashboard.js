import React, { useEffect, useState } from 'react';
import editIcon from '../img/editer.png';
import cancelIcon from '../img/effacer.png';
import validIcon from '../img/valider.png';
import annulIcon from '../img/annuler.png';

const Dashboard = () => {
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
        const url = `http://localhost:3000/users/${editingUser.id}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingUser),
            });
            if (response.ok) {
                const user = await response.json();
                setUsers((users) =>
                    users.map((u) => (u.id === user.id ? user : u)),
                );
                setEditingUser(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteUser = async () => {
        const url = `http://localhost:3000/users/${selectedUser.id}`;
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
                                <td><img src={editIcon} alt="Update" /></td>
                                <td><img src={cancelIcon} alt="Delete" onClick={deleteUser}/></td>
                            </tr>
                        ))}
                {creatingUser ? (
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" placeholder="Prénom" onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}/>
                        </td>
                        <td>
                            <input type="text" placeholder="Nom" onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })} />
                        </td>
                        <td>
                            <input type="email" placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                        </td>
                        <td>
                            <input type="password" placeholder="Mot de passe" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                        </td>
                        <td><img src={validIcon} alt="Valider" onClick={handleCreate}/></td>
                        <td><img src={annulIcon} alt="Annuler" onClick={() => window.location.reload()}/></td>
                    </tr>
                ) : null}
                </tbody>
            </table>
            <div className="crud">
                <button onClick={() => setCreatingUser(true)}>Create</button>
            </div>
        </>
    );
};
export default Dashboard;