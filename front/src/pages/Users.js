import NavBar from'../components/NavBar';
import CRUD from '../components/CRUD';

export default function DisplayUsers(){
    const param = "users"
    const fields = [
        { name: 'firstname', label: 'Prénom'},
        { name: 'lastname', label: 'Nom'},
        { name: 'email', label: 'Email'},
        { name: 'password', label: 'Mot de passe'}
    ]
    return(
        <>
            <NavBar></NavBar>
            <h1>Welcome on Admin Dashboard</h1>
            <CRUD param={param} fields={fields}></CRUD>
        </>
    ) 
}