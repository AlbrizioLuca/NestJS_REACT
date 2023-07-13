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

const candidateFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="candidates" label="Candidates" reference="candidates" />,
];

export const CandidateList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={candidateFilters}>
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
                    <TextField source="phone" />
                    <TextField source="birthday" />
                    <TextField source="vehicle" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

const CandidateTitle = () => {
    const record = useRecordContext();
    return <span> Profil {record ? `"${record.firstname + ' ' + record.lastname}"` : ''}</span>;
};

export const CandidateEdit = () => (
    <Edit title={<CandidateTitle/>}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="diploma" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="birthday" />
            <TextInput source="vehicle" />
        </SimpleForm>
    </Edit>
);

export const CandidateCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="diploma" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="birthday" />
            <TextInput source="vehicle" />
        </SimpleForm>
    </Create>
);