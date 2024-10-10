'use client'
import React from 'react';
import { Admin, Resource, EditGuesse } from 'react-admin';
import dataProvider from '@/context/dataProvider';
import { CustomerCreate, CustomerEdit, CustomerList } from './customer';
import { AdminCreate, AdminEdit, AdminList } from './admin';
import { TicketCreate, TicketEdit, TicketList } from './ticket';
import { BookingList, BookingEdit, BookingCreate } from './bookings';
import { ContactCustomerCreate, ContactCustomerList, ContactCustomerEdit } from './contactCustomer';

const AdminDashboard = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="customers" list={CustomerList} create={CustomerCreate} edit={CustomerEdit}/>
    <Resource name="admins" list = {AdminList} create={AdminCreate} edit={AdminEdit}/>
    <Resource name="bookings" list = {BookingList} create= {BookingCreate} edit = {BookingEdit}/>
    <Resource name="contact-customer" list = {ContactCustomerList} create= {ContactCustomerCreate} edit = {ContactCustomerEdit}/>
    <Resource name="tickets" list = {TicketList} create= {TicketCreate} edit = {TicketEdit}/>
  </Admin>
);

export default AdminDashboard;