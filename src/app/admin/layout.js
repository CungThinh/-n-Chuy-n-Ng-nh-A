const AdminLayout = ({ children }) => {
  return (
      <div className="pt-14"> {/* Thêm khoảng trống phía trên */}
        {children}
      </div>
  );
};

export default AdminLayout;