import React from 'react';
import { Admin, Resource, List, Datagrid, TextField, EmailField, EditButton, DeleteButton, Create, SimpleForm, TextInput, Edit, required } from 'react-admin';

// Phần AdminList (Danh sách Admin)
export const AdminList = (props) => (
    <List {...props} title="Admin">
        <Datagrid>
            <TextField source="id" label="ID" />
            <EmailField source="email" label="Email" />
            <TextField source="name" label="Name" />
            <TextField source="createdAt" label="Created At" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// Phần AdminCreate (Tạo mới Admin)
export const AdminCreate = (props) => (
    <Create {...props} title="Create New Admin">
        <SimpleForm>
            <TextInput source="email" label="Email" validate={required()} />
            <TextInput source="password" label="Password" validate={required()} type="password" />
            <TextInput source="name" label="Name" validate={required()} />
        </SimpleForm>
    </Create>
);

// Phần AdminEdit (Chỉnh sửa Admin)
export const AdminEdit = (props) => (
    <Edit {...props} title="Edit Admin">
        <SimpleForm>
            <TextInput source="email" label="Email" validate={required()} />
            <TextInput source="name" label="Name" validate={required()} />
        </SimpleForm>
    </Edit>
);