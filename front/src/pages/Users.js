import NavBar from'../components/NavBar';
import TableCRUD from '../components/TableCRUD';

export default function DisplayUsers(){
    return(
        <>
            <NavBar></NavBar>
            <h1>Welcome on Admin Dashboard</h1>
            <TableCRUD></TableCRUD>
        </>
    ) 
}