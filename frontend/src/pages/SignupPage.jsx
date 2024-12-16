import React, { useState } from 'react';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const  response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message || 'Signup Failed');
            }
        } catch (error) {
            console.error('Error signing up', error);
            alert('An error occured. Please try again');
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-80'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Signup</h2>
                <input 
                type="text" 
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
                />
                <input 
                type="email" 
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
                />
                <input 
                type="password" 
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
                />
                <button className='bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600'>
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignupPage;