import NavBar from'../components/NavBar';
import CRUD from '../components/CRUD';

export default function DisplayClients(){
    const param = "clients"
    const fields = [
        { name: 'enterprise', label: 'Entreprise'},
        { name: 'firstname', label: 'Prénom'},
        { name: 'lastname', label: 'Nom'},
        { name: 'email', label: 'Email'},
        { name: 'phone', label: 'Téléphone'}
    ]
    return(
        <>
            <NavBar></NavBar>
            <h1>Welcome on Admin Dashboard</h1>
            <CRUD param={param} fields={fields}></CRUD>
        </>
    ) 
}