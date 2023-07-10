import NavBar from'../components/NavBar';
import Dashboard from '../components/Dashboard';

export default function DisplayUsers(){
    return(
        <>
            <NavBar></NavBar>
            <h1>Welcome on Admin Dashboard</h1>
            <Dashboard></Dashboard>
        </>
    ) 
}