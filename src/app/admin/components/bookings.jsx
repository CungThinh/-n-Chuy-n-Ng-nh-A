import React from 'react';
import { List, Datagrid, TextField, DateField, BooleanField, ReferenceField, Edit, SimpleForm, ReferenceInput, SelectInput, BooleanInput, DateInput, Create, EditButton, DeleteButton, ArrayInput, SimpleFormIterator, TextInput, NumberInput } from 'react-admin';

// BookingList - Hiển thị danh sách Booking, bao gồm trường Tickets
export const BookingList = (props) => (
    <List {...props}>
        <Datagrid rowClick={false}>
            <TextField source="id" label="Booking ID" />
            <ReferenceField source="contactCustomerId" reference="contact-customer" label="Contact Customer">
                <TextField source="firstName" />
            </ReferenceField>
            <BooleanField source="isRoundTrip" label="Round Trip" />
            <DateField source="createdAt" label="Created At" />
            <DateField source="updatedAt" label="Updated At" />
            {/* Số lượng vé liên kết với Booking */}
            <TextField source="tickets.length" label="Number of Tickets" />
            
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);


export const BookingCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="contactCustomerId" reference="contact-customer" label="Contact Customer"/>
            <BooleanInput source="isRoundTrip" label="Round Trip" />
            <DateInput source="createdAt" label="Created At" defaultValue={new Date()} />
            <ArrayInput source="tickets" label="Tickets">
                <SimpleFormIterator>
                    <TextInput source="flightNumber" label="Flight Number" />
                    <TextInput source="airline" label="Airline" />
                    <TextInput source="departureAirport" label="Departure Airport" />
                    <TextInput source="arrivalAirport" label="Arrival Airport" />
                    <DateInput source="departureTime" label="Departure Time" />
                    <DateInput source="arrivalTime" label="Arrival Time" />
                    <TextInput source="travelClass" label="Travel Class" />
                    <NumberInput source="price" label="Price" />
                    <TextInput source="legroom" label="Legroom" />
                    
                    {/* Liên kết Ticket với Customer */}
                    <ReferenceInput source="customerId" reference="customers" label="Customer">
                        <SelectInput optionText="firstName" />
                    </ReferenceInput>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

// BookingEdit - Chỉnh sửa Booking với danh sách vé (tickets)
export const BookingEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="contactCustomerId" reference="contactCustomers" label="Contact Customer">
                <SelectInput optionText="firstName" />
            </ReferenceInput>
            <BooleanInput source="isRoundTrip" label="Round Trip" />
            <DateInput source="createdAt" label="Created At" />
            <DateInput source="updatedAt" label="Updated At" defaultValue={new Date()} />

            <ArrayInput source="tickets" label="Tickets">
                <SimpleFormIterator>
                    <TextInput source="flightNumber" label="Flight Number" />
                    <TextInput source="airline" label="Airline" />
                    <TextInput source="departureAirport" label="Departure Airport" />
                    <TextInput source="arrivalAirport" label="Arrival Airport" />
                    <DateInput source="departureTime" label="Departure Time" />
                    <DateInput source="arrivalTime" label="Arrival Time" />
                    <TextInput source="travelClass" label="Travel Class" />
                    <NumberInput source="price" label="Price" />
                    <TextInput source="legroom" label="Legroom" />
                    
                    {/* Liên kết Ticket với Customer */}
                    <ReferenceInput source="customerId" reference="customers" label="Customer">
                        <SelectInput optionText="firstName" />
                    </ReferenceInput>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);