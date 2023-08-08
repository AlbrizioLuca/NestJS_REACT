import { useState } from "react";
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
    ReferenceInput,
    BooleanInput,
    PasswordInput
} from "react-admin";
import { inputAttributes, validateName, validateEmail, validatePassword } from './inputAttributes';

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

export const UserEdit = () => {
    const [changePassword, setChangePassword] = useState(false);

    return (
        <Edit title={<UserTitle />}>
            <SimpleForm>
                <TextInput source="id" disabled />
                <TextInput source="firstname" validate={validateName} title={inputAttributes.title.name} />
                <TextInput source="lastname" validate={validateName} title={inputAttributes.title.name} />
                <TextInput source="email" validate={validateEmail} title={inputAttributes.title.email} />
                <BooleanInput
                    source="changePassword"
                    label="Changer le mot de passe"
                    onChange={(event) =>
                        setChangePassword(event.target.checked)}
                />
                {changePassword && (
                    <PasswordInput source="password" value="" validate={validatePassword} title={inputAttributes.title.password} />
                )}
            </SimpleForm>
        </Edit>
    );
};

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="firstname" validate={validateName} title={inputAttributes.title.name} />
            <TextInput source="lastname" validate={validateName} title={inputAttributes.title.name} />
            <TextInput source="email" validate={validateEmail} title={inputAttributes.title.email} />
            <PasswordInput source="password" validate={validatePassword} title={inputAttributes.title.password} />
        </SimpleForm>
    </Create>
);