export const handleCreate = async (url, fields, newData, setData, setCreatingData) => {
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

export const handleUpdate = async (url, fields, editingData, data, setData, setEditingData) => {
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

export const handleDelete = async (url, selectedData, setData, setSelectedData) => {
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