'use client'
import React from 'react';
import { Admin, Resource, EditGuesse } from 'react-admin';
import dataProvider from '@/context/dataProvider';
import { CustomerCreate, CustomerEdit, CustomerList } from './CustomerResource';
import { AdminCreate, AdminEdit, AdminList } from './AdminResource';
import { TicketCreate, TicketEdit, TicketList } from './TicketResource';
import { BookingList, BookingEdit, BookingCreate } from './BookingResource';
import { ContactCustomerCreate, ContactCustomerList, ContactCustomerEdit } from './ContactCustomerResource';
import { PaymentCreate, PaymentEdit, PaymentList } from './PaymentResource';

const AdminDashboard = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="customers" list={CustomerList} create={CustomerCreate} edit={CustomerEdit}/>
    <Resource name="admins" list = {AdminList} create={AdminCreate} edit={AdminEdit}/>
    <Resource name="bookings" list = {BookingList} create= {BookingCreate} edit = {BookingEdit}/>
    <Resource name="contact-customer" list = {ContactCustomerList} create= {ContactCustomerCreate} edit = {ContactCustomerEdit}/>
    <Resource name="tickets" list = {TicketList} create= {TicketCreate} edit = {TicketEdit}/>
    <Resource name="payments" list = {PaymentList} create= {PaymentCreate} edit = {PaymentEdit}/>
  </Admin>
);

export default AdminDashboard;