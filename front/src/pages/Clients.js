import NavBar from'../components/NavBar';
import CRUD from '../components/CRUD';


export default function DisplayClients(){
    const param = "clients"
    return(
        <>
            <NavBar></NavBar>
            <h1>Welcome on Admin Dashboard</h1>
            <CRUD param={param}></CRUD>
        </>
    ) 
}