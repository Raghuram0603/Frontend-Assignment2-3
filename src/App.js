import React, { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import UserForm from './components/UserForm';
import Modal from './components/Modal';
import LoadingSpinner from './components/LoadingSpinner';
import { getUsers, createUser, updateUser, deleteUser } from './services/userService';
import './styles/App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const userData = await getUsers();
      setUsers(userData);
      setMessage({ type: '', text: '' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to load users' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (type, text, duration = 3000) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, duration);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (userData) => {
    console.log("Editing user with ID:", userData.id);
    try {
      setIsSubmitting(true);
      
      if (editingUser) {
        const updatedUser = await updateUser(editingUser.id, userData);
        
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === editingUser.id ? updatedUser : user
          )
        );
        
        showMessage('success', `${updatedUser.name} has been updated successfully!`);
      } else {
        const newUser = await createUser(userData);
        
        const tempId = Math.max(...users.map(u => u.id), 0) + 1;
        const userWithTempId = { ...newUser, id: tempId };
        
        setUsers(prevUsers => [...prevUsers, userWithTempId]);
        showMessage('success', `${newUser.name} has been created successfully!`);
      }
      
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      showMessage('error', error.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingUserId(userId);
      
      await deleteUser(userId);
      
      const deletedUser = users.find(user => user.id === userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      showMessage('success', `${deletedUser?.name || 'User'} has been deleted successfully!`);
    } catch (error) {
      showMessage('error', error.message || 'Failed to delete user');
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>
            User Management System
          </h1>
        </header>

        {message.text && (
          <div className={`message message-${message.type}`}>
            <i className={`fas ${
              message.type === 'success' ? 'fa-check-circle' : 
              message.type === 'error' ? 'fa-exclamation-circle' : 
              'fa-info-circle'
            }`}></i>
            {message.text}
          </div>
        )}

        <button 
          className="btn btn-primary create-user-btn"
          style={{backgroundColor:"green" , marginRight:"0px" , marginLeft:"829px" }}
          onClick={handleCreateUser}
          disabled={isLoading}
        >
          Create New User
        </button>

        {isLoading ? (
          <LoadingSpinner message="Loading users..." />
        ) : users.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-users"></i>
            <h3>No Users Found</h3>
            <p>Get started by creating your first user!</p>
          </div>
        ) : (
          <div className="users-grid">
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                isDeleting={deletingUserId === user.id}
              />
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={editingUser ? 'Edit User' : 'Create New User'}
        >
          <UserForm
            user={editingUser}
            onSubmit={handleFormSubmit}
            onCancel={handleModalClose}
            isLoading={isSubmitting}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;