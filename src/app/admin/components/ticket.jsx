import React from 'react';
import { List, Datagrid, TextField, NumberField, DateField, EditButton, DeleteButton, ReferenceField, Create, SimpleForm, TextInput, DateTimeInput, SelectInput, NumberInput, ReferenceInput } from 'react-admin';

// TicketList - Hiển thị danh sách các vé (tickets)
export const TicketList = (props) => (
    <List {...props} title="List of Tickets">
        <Datagrid>
            <TextField source="flightNumber" label="Flight Number" />
            <TextField source="airline" label="Airline" />
            <TextField source="departureAirport" label="Departure Airport" />
            <TextField source="arrivalAirport" label="Arrival Airport" />
            <DateField source="departureTime" label="Departure Time" />
            <DateField source="arrivalTime" label="Arrival Time" />
            <TextField source="travelClass" label="Class" />
            <NumberField source="total_duration" label="Total Duration (mins)" />
            <NumberField source="price" label="Price" />
            <TextField source="legroom" label="Legroom" />
            {/* Liên kết với bảng Booking */}
            <ReferenceField source="bookingId" reference="bookings" label="Booking">
                <TextField source="id" />
            </ReferenceField>
            <ReferenceField source="customerId" reference="customers" label="Customer">
                <TextField source="firstName" />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// TicketCreate - Tạo mới một vé (ticket)
export const TicketCreate = (props) => (
    <Create {...props} title="Create New Ticket">
        <SimpleForm>
            <TextInput source="flightNumber" label="Flight Number" />
            <TextInput source="airline" label="Airline" />
            <TextInput source="departureAirport" label="Departure Airport" />
            <TextInput source="arrivalAirport" label="Arrival Airport" />
            <DateTimeInput source="departureTime" label="Departure Time" />
            <DateTimeInput source="arrivalTime" label="Arrival Time" />
            <SelectInput source="travelClass" label="Travel Class" choices={[
                { id: 'Economy', name: 'Economy' },
                { id: 'Business', name: 'Business' },
                { id: 'First', name: 'First' }
            ]} />
            <NumberInput source="total_duration" label="Total Duration (mins)" />
            <NumberInput source="price" label="Price" />
            <TextInput source="legroom" label="Legroom" />
            {/* Thêm lựa chọn Booking */}
            <ReferenceInput source="bookingId" reference="bookings" label="Booking">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput source="customerId" reference="customers" label="Customer">
                <SelectInput optionText="firstName" />
            </ReferenceInput>
            <TextInput source="passportNumber" label="Passport Number" />
        </SimpleForm>
    </Create>
);

// TicketEdit - Chỉnh sửa thông tin vé (ticket)
export const TicketEdit = (props) => (
    <Edit {...props} title="Edit Ticket">
        <SimpleForm>
            <TextInput source="flightNumber" label="Flight Number" />
            <TextInput source="airline" label="Airline" />
            <TextInput source="departureAirport" label="Departure Airport" />
            <TextInput source="arrivalAirport" label="Arrival Airport" />
            <DateTimeInput source="departureTime" label="Departure Time" />
            <DateTimeInput source="arrivalTime" label="Arrival Time" />
            <SelectInput source="travelClass" label="Travel Class" choices={[
                { id: 'Economy', name: 'Economy' },
                { id: 'Business', name: 'Business' },
                { id: 'First', name: 'First' }
            ]} />
            <NumberInput source="total_duration" label="Total Duration (mins)" />
            <NumberInput source="price" label="Price" />
            <TextInput source="legroom" label="Legroom" />
            {/* Thêm lựa chọn Booking */}
            <ReferenceInput source="bookingId" reference="booking" label="Booking">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput source="customerId" reference="customers" label="Customer">
                <SelectInput optionText="firstName" />
            </ReferenceInput>
            <TextInput source="passportNumber" label="Passport Number" />
        </SimpleForm>
    </Edit>
);
