import React from 'react';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('./components/AdminDashboard'), { ssr: false })

const AdminPage = () => (
    <div>
        <AdminDashboard />
    </div>
);

export default AdminPage;