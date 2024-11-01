"use client";
import React from "react";
import { Admin, Resource } from "react-admin";

import {
  CustomerCreate,
  CustomerEdit,
  CustomerList,
} from "./Resource/CustomerResource";
import { AdminCreate, AdminEdit, AdminList } from "./Resource/AdminResource";
import {
  TicketCreate,
  TicketEdit,
  TicketList,
} from "./Resource/TicketResource";
import {
  BookingList,
  BookingEdit,
  BookingCreate,
} from "./Resource/BookingResource";
import {
  ContactCustomerCreate,
  ContactCustomerList,
  ContactCustomerEdit,
} from "./Resource/ContactCustomerResource";
import {
  PaymentCreate,
  PaymentEdit,
  PaymentList,
} from "./Resource/PaymentResource";
import Dashboard from "./Dashboard/Dashboard";

import dataProvider from "@/context/dataProvider";

const AdminDashboard = () => (
  <Admin dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource
      name="customers"
      list={CustomerList}
      create={CustomerCreate}
      edit={CustomerEdit}
    />
    <Resource
      name="admins"
      list={AdminList}
      create={AdminCreate}
      edit={AdminEdit}
    />
    <Resource
      name="bookings"
      list={BookingList}
      create={BookingCreate}
      edit={BookingEdit}
    />
    <Resource
      name="contact-customer"
      list={ContactCustomerList}
      create={ContactCustomerCreate}
      edit={ContactCustomerEdit}
    />
    <Resource
      name="tickets"
      list={TicketList}
      create={TicketCreate}
      edit={TicketEdit}
    />
    <Resource
      name="payments"
      list={PaymentList}
      create={PaymentCreate}
      edit={PaymentEdit}
    />
  </Admin>
);

export default AdminDashboard;
