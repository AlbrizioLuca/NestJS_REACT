import { useMediaQuery, Theme } from "@mui/material";
import { 
    List,
    SimpleList,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    useRecordContext,
    ReferenceInput
} from "react-admin";

const userFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="users" label="Users" reference="users" />,
];

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={userFilters}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.firstname}
                    secondaryText={(record) => record.lastname}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="firstname" />
                    <TextField source="lastname" />
                    <EmailField source="email" />
                    <TextField source="password" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

const UserTitle = () => {
    const record = useRecordContext();
    return <span> Profil {record ? `"${record.firstname + ' ' + record.lastname}"` : ''}</span>;
};

export const UserEdit = () => (
    <Edit title={<UserTitle/>}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="email" />
            <TextInput source="password" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="email" />
            <TextInput source="password" />
        </SimpleForm>
    </Create>
);