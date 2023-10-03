import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

// Cette fonction est un Higher Order Component (HOC) qui prend un composant en argument
export default function withAuthentication (Component) {
    return (props) => {
        // On récupère le contexte d'authentification à l'aide du hook useContext
        const { user } = useContext(AuthContext);
        // On utilise le hook useNavigate pour pouvoir naviguer vers d'autres pages
        const navigate = useNavigate();
        
        // Si l'utilisateur n'est pas connecté, on affiche un message d'erreur et un lien de redirection vers la page de connexion
        if (!user) {
            return <div>
                <h2>Vous n'avez pas accès à cette page</h2>
                <p>Connectez-vous pour pouvoir accéder à la page en cliquant <span className='redirection' onClick={() => navigate('/')}>ici</span>.</p>
            </div>
        }
        
        // Si l'utilisateur est connecté, on rend le composant passé en argument avec les props
        return <Component {...props} />
    }
}