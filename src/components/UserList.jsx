import React, { useContext, useEffect, useState } from 'react';
import next from '../assets/next.png'
import back from '../assets/back.png'
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AppContext';
import Loading from './Loading';



const UserList = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { handleError, handleSuccess } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    id: null,
    avatar: ''
  });

  async function fetchUsers(page) {
    const response = await fetch(`${baseUrl}/api/users?page=${page}`);
    if (response.ok) {
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(Math.ceil(data.total / 10));
    }
    else {
      console.log('Error while fetching Users');
      throw Error('Error while fetchig Users');

    }
  }

  useEffect(() => {

    fetchUsers(page);

  }, [page]);


  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleEditClick = (id) => {
    const user = users.filter(user => user.id === id);
    setFormData(user[0]);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/users/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('User Edited Successfully', updatedUser);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === formData.id ? { ...user, ...updatedUser } : user
          )
        );
        setIsPopupOpen(false);
        handleSuccess('User Edited Successfully');
      } else {
        console.error('Error while editing user:', response.status, response.statusText);
        handleError('Failed to edit user. Please try again.');
      }
    } catch (error) {
      console.error('Error while editing user:', error);
      handleError('An error occurred. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseUrl}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`User with ID ${id} deleted successfully`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        handleSuccess(`User with ID ${id} deleted successfully`)
      } else {
        console.error('Error while deleting user:', response.status, response.statusText);
        handleError('Failed to delete the user. Please try again.');
      }
    } catch (error) {
      console.error('Error while deleting user:', error);
      handleError('An error occurred. Please try again later.');
    }
  };

  if (users.length < 0) return <Loading />;


  return (
    <div>
      <h1 className='text-center font-semibold text-3xl mt-12 text-blue-400'>Users</h1>
      <div className='flex flex-col gap-4 p-4'>
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`opacity-0 transform translate-y-4 rounded-xl flex gap-4 border px-4 py-2 shadow-lg transition-opacity duration-100 ease-out`}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.3}s forwards`,
            }}
          >
            <img src={user.avatar} alt={user.first_name} className='rounded-full w-24 h-24' />
            <div className='flex flex-col sm:flex-row gap-3 w-full'>
              <div className='flex flex-col justify-center items-left'>
                <h1 className='font-semibold text-2xl'>{`${user.first_name} ${user.last_name}`}</h1>
                <p className='text-blue-700 font-normal'>{user.email}</p>
              </div>
              <div className='flex justify-start sm:justify-end w-full gap-4 items-center'>
                <button className='bg-green-400 hover:bg-green-500 text-white rounded-md font-semibold px-4 py-2' onClick={() => handleEditClick(user.id)}>Edit</button>
                <button className='bg-black/90 hover:bg-black/75 text-white rounded-md font-semibold px-4 py-2' onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 justify-center items-center mb-4">
        <button onClick={handlePrev} disabled={page === 1}>
          <img src={back} alt='back_button' className='w-8 h-8' />
        </button>
        <span className='font-semibold'>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>
          <img src={next} alt='next_button' className='w-8 h-8' />
        </button>
      </div>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w[70%] lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Edit Details</h2>
            <div className="flex flex-col gap-2">
              <label className='font-semibold'>First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                className='border rounded-md px-4 py-1'
              />
              <label className='font-semibold'>Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, last_name: e.target.value }))
                }
                className='border rounded-md px-4 py-1'
              />
              <label className='font-semibold'>Email</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className='border rounded-md px-4 py-1'
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleClosePopup}
               className='bg-gray-500 hover:bg-gray-500 text-white rounded-md font-semibold px-4 py-2'
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
               className='bg-blue-500 hover:bg-green-500 text-white rounded-md font-semibold px-4 py-2'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default UserList