//@ts-nocheck
import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList, UserEdit, UserCreate}  from "./Users";
import { ClientList, ClientEdit, ClientCreate}  from "./Clients";
import { CandidateList, CandidateEdit, CandidateCreate}  from "./Candidates";
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';

import UserIcon from "@mui/icons-material/VerifiedUser";
import ClientIcon from "@mui/icons-material/Work";
import CandidateIcon from "@mui/icons-material/AccountBox";

export type ResourceType = {
  name: string;
  data: Record<string, any>;
  path?: string;
}

export type ResourcesType = Record<string, ResourceType>;

const resources : ResourcesType = {
  users : { name: "users", data: {icon: UserIcon, list: UserList, edit: UserEdit, create: UserCreate}, path: '/users'},
  clients: { name: "clients", data: {icon: ClientIcon, list: ClientList, edit: ClientEdit, create: ClientCreate} },
  candidates: { name: "candidates", data: {icon: CandidateIcon, list: CandidateList, edit: CandidateEdit, create: CandidateCreate} }
};

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    {Object.keys(resources).map((key) => (
      //@ts-ignore
      <Resource key={key} name={resources[key].name} {...resources[key].data} />
    ))}
  </Admin>
);