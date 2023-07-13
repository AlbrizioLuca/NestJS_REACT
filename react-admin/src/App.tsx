import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList, UserEdit, UserCreate}  from "./Users";
import { ClientList, ClientEdit, ClientCreate}  from "./Clients";
import { CandidateList, CandidateEdit, CandidateCreate}  from "./Candidates";
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';
import UserIcon from "@mui/icons-material/Group";
import ClientIcon from "@mui/icons-material/Group";
import CandidateIcon from "@mui/icons-material/Group";

export const App = () =>
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="users" icon={UserIcon} list={UserList} edit={UserEdit} create={UserCreate}/>
    <Resource name="clients" icon={ClientIcon} list={ClientList} edit={ClientEdit} create={ClientCreate}/>
    <Resource name="candidates" icon={CandidateIcon} list={CandidateList} edit={CandidateEdit} create={CandidateCreate}/>
  </Admin>;