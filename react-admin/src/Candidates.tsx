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
    BooleanField,
    NumberInput
} from "react-admin";
import { inputAttributes, validateName, validatePhone, validateEmail} from './inputAttributes';

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
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="firstname" />
                    <TextField source="lastname" />
                    <EmailField source="email" />
                    <TextField source="phone" />
                    <TextField source="diploma" />
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
    { id: 'Sans aucun diplôme' , name: 'Sans aucun diplôme'}, 
    { id: 'BEP / CAP' , name: 'BEP / CAP'}, 
    { id: 'Bac' , name: 'Bac'}, 
    { id: 'Bac +2' , name: 'Bac +2'}, 
    { id: 'Licence' , name: 'Licence'}, 
    { id: 'Master' , name: 'Master'}
];

export const CandidateEdit = () => (
    
    <Edit title={<CandidateTitle/>}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="firstname" validate={validateName} title={inputAttributes.title.name} />
            <TextInput source="lastname" validate={validateName} title={inputAttributes.title.name} />
            <SelectInput source="diploma" choices={diplomaList} />
            <TextInput source="email" validate={validateEmail} title={inputAttributes.title.email} />
            <NumberInput source="phone" validate={validatePhone} title={inputAttributes.title.phone} />
            <DateInput source="birthday" validate={minValue('1930-01-01')} />
            <BooleanInput source="vehicle" label="Est-il véhiculé ?"/>
        </SimpleForm>
    </Edit>
);

export const CandidateCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="firstname" validate={validateName} title={inputAttributes.title.name} />
            <TextInput source="lastname" validate={validateName} title={inputAttributes.title.name} />
            <SelectInput source="diploma" choices={diplomaList} />
            <TextInput source="email" validate={validateEmail} title={inputAttributes.title.email} />
            <NumberInput source="phone" validate={validatePhone} title={inputAttributes.title.phone} />
            <DateInput source="birthday" validate={minValue('1930-01-01')} />
            <BooleanInput source="vehicle" label="Est-il véhiculé ?"/>
        </SimpleForm>
    </Create>
);