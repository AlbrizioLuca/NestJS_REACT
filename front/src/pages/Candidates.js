import NavBar from'../components/NavBar';
import CRUD from '../components/CRUD';


export default function DisplayCandidates(){
    const param = "candidates"
    const fields = [
        { name: 'firstname', label: 'Prénom'},
        { name: 'lastname', label: 'Nom'},
        { name: 'diploma', label: 'Diplome'},
        { name: 'email', label: 'Email'},
        { name: 'phone', label: 'Téléphone'},
        { name: 'birthday', label: 'Naissance'},
        { name: 'vehicle', label: 'Véhiculé'}
    ]
    return(
        <>
            <NavBar></NavBar>
            <h1>Welcome on Admin Dashboard</h1>
            <CRUD param={param} fields={fields}></CRUD>
        </>
    ) 
}