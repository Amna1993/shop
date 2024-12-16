import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch users
        const usersResponse = await fetch('http://localhost:5006/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // Fetch products
        const productsResponse = await fetch('http://localhost:5006/api/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch orders
        const ordersResponse = await fetch('http://localhost:5006/api/admin/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>
  

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Users</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.isAdmin ? 'Admin' : 'User'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
  <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <div
        key={product._id}
        className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
      >
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm">Price: <span className="text-blue-500 font-bold">${product.price}</span></p>
      </div>
    ))}
  </div>
</div>


      <div>
  <h2 className="text-2xl font-bold mb-4">Orders</h2>
  {orders.length === 0 ? (
    <p>No orders found.</p>
  ) : (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">Order ID</th>
          <th className="border px-4 py-2">User</th>
          <th className="border px-4 py-2">Total Amount</th>
          <th className="border px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td className="border px-4 py-2">{order._id}</td>
            <td className="border px-4 py-2">{order.user?.name || 'Unknown'}</td>
            <td className="border px-4 py-2">${order.totalAmount}</td>
            <td className="border px-4 py-2">{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

    </div>
  );
};

export default AdminDashboard;
