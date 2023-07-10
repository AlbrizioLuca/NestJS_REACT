import React, { useState } from 'react';

const Field = ({ name, type, value, onChange, children }) => (
  <div>
    <label htmlFor={name}>{children}</label>
    <br />
    <input
      type={type}
      value={value}
      onChange={onChange}
      id={name}
      name={name}
    />
  </div>
);

const Checkbox = ({ name, value, onChange, children }) => (
  <div>
    <label htmlFor={name}>{children}</label>
    <input
      type="checkbox"
      checked={value}
      onChange={onChange}
      id={name}
      name={name}
      className="check"
    />
  </div>
);

const Formulaire = () => {
  const [state, setState] = useState({
    nom: '',
    prenom: '',
    username: '',
    password: '',
    mail: '',
    birthday: '',
    newsletter: false,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      nom: '',
      prenom: '',
      username: '',
      password: '',
      mail: '',
      birthday: '',
      newsletter: false,
    });
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <Field type="text" name="nom" value={state.nom} onChange={handleChange}>
        Nom
      </Field>
      <Field
        type="text"
        name="prenom"
        value={state.prenom}
        onChange={handleChange}
      >
        Prenom
      </Field>
      <Field
        type="text"
        name="username"
        value={state.username}
        onChange={handleChange}
      >
        Username
      </Field>
      <Field
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
      >
        Mot de Passe
      </Field>
      <Field
        type="email"
        name="mail"
        value={state.mail}
        onChange={handleChange}
      >
        Mail
      </Field>
      <Field
        type="date"
        name="birthday"
        value={state.birthday}
        onChange={handleChange}
      >
        Date de naissance
      </Field>
      <Checkbox
        name="newsletter"
        value={state.newsletter}
        onChange={handleChange}
      >
        S'abonner à la newsletter?
      </Checkbox>
      <button>Envoyer</button>
    </form>
  );
};
export default Formulaire;
