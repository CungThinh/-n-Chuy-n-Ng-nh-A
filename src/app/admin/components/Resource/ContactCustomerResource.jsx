import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  Edit,
} from "react-admin";

// ContactCustomerList - Hiển thị danh sách ContactCustomer
export const ContactCustomerList = (props) => (
  <List {...props}>
    <Datagrid rowClick={false}>
      <TextField source="id" label="ID" />
      <TextField source="firstName" label="First Name" />
      <TextField source="lastName" label="Last Name" />
      <TextField source="phone" label="Phone" />
      <TextField source="email" label="Email" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// ContactCustomerCreate - Tạo mới ContactCustomer
export const ContactCustomerCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" label="First Name" />
      <TextInput source="lastName" label="Last Name" />
      <TextInput source="phone" label="Phone" />
      <TextInput source="email" label="Email" />
    </SimpleForm>
  </Create>
);

// ContactCustomerEdit - Chỉnh sửa ContactCustomer
export const ContactCustomerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="firstName" label="First Name" />
      <TextInput source="lastName" label="Last Name" />
      <TextInput source="phone" label="Phone" />
      <TextInput source="email" label="Email" />
    </SimpleForm>
  </Edit>
);
