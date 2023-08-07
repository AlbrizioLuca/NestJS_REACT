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
    DateInput,
    minValue,
    SelectInput,
    BooleanField
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
                    <BooleanField source="vehicle" />
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

const diplomaList = [ 
    { id: '0' , name: 'Sans aucun diplôme'}, 
    { id: '1' , name: 'BEP / CAP'}, 
    { id: '2' , name: 'Bac'}, 
    { id: '3' , name: 'Bac + 2'}, 
    { id: '4' , name: 'Licence'}, 
    { id: '5' , name: 'Master'}
];

export const CandidateEdit = () => (
    
    <Edit title={<CandidateTitle/>}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <SelectInput source="diploma" choices={diplomaList} />
            <TextInput source="email" />
            <TextInput source="phone" />
            <DateInput source="birthday" validate={minValue('1930-01-01')} />
            <BooleanInput source="vehicle" label="Est-il véhiculé ?"/>
        </SimpleForm>
    </Edit>
);

export const CandidateCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <SelectInput source="diploma" choices={diplomaList} />
            <TextInput source="email" />
            <TextInput source="phone" />
            <DateInput source="birthday" validate={minValue('1930-01-01')} />
            <BooleanInput source="vehicle" label="Est-il véhiculé ?"/>
        </SimpleForm>
    </Create>
);