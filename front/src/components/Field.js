export default function Field({ name, type, onChange, label, placeholder, required, props }) {
    let inputTypes = ['file', 'text', 'password', 'email']; // Liste des types d'entrée acceptés
    const isInput = type && inputTypes.indexOf(type) !== -1; // Vérifie si le type d'entrée est valide
    const classInput = 'input field-' + name; // Classe CSS pour l'élément d'entrée

    if (!isInput) { // Si le type d'entrée n'est pas valide
        return (
            <div className={classInput}>
                <label htmlFor={name}>{label}</label> 
                <textarea 
                    id={name} 
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    rows="5" 
                    cols="30">
                </textarea> 
            </div>
        );
    }

    return (
        <div className={classInput}>
            <label htmlFor={name}>{label}</label> 
            <input
                type={type}
                onChange={onChange}
                id={name}
                placeholder={placeholder}
                name={name}
                required={required}
                {...props}
            /> 
        </div>
    );
};