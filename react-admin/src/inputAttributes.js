const inputAttributes = {

    regex: {
        name: /^(?![- ])[a-zA-ZÀ-ÿ -]*[^- ]$/,
        enterprise: /^(?![- ])[a-zA-ZÀ-ÿ0-9 -]*[^- ]$/,
        email: /^\w[\w.-_]*@\w[\w.-_]*(?:\.\w[\w-]*)+$/,
        password: /^(?=.*[a-zà-ÿ])(?=.*[A-ZÀ-Ÿ])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-zÀ-ÿ\d@$!%*?&.]{8,}$/,
        phone: /^\d{10}$/
    },

    title: {
        name: `Le champ doit contenir uniquement des lettres et/ou trait d'union.`,
        enterprise: `Le champ doit contenir uniquement des lettres et/ou chiffres.`,
        email: `Le champ doit être une adresse email valide, example@email.com`,
        password: `Le champ doit contenir au minimum 8 caractères dont :
            \n- Une ou plusieurs lettres majuscules
            \n- Une ou plusieurs lettres minuscules
            \n- Un ou plusieurs chiffres
            \n- Un ou plusieurs caractères spécifiques parmi les suivants ( @ $ ! % * ? & . )`,
        phone: `Le champ doit contenir un numéro de téléphone composé de 10 chiffres.`
    },
}

const validateName = (value) => {
    if (!inputAttributes.regex.name.test(value)) {
        return inputAttributes.title.name;
    }
};

const validateEnterprise = (value) => {
    if (!inputAttributes.regex.enterprise.test(value)) {
        return inputAttributes.title.enterprise;
    }
};

const validateEmail = (value) => {
    if (!inputAttributes.regex.email.test(value)) {
        return inputAttributes.title.email;
    }
};

const validatePassword = (value) => {
    if (!inputAttributes.regex.password.test(value)) {
        return inputAttributes.title.password;
    }
};

const validatePhone = (value) => {
    if (!inputAttributes.regex.phone.test(value)) {
        return inputAttributes.title.phone;
    }
};

export { inputAttributes, validateName, validateEnterprise, validateEmail, validatePassword, validatePhone };