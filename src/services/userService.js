// User service for API calls
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }
  return response.json();
};

const simulateDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getUsers = async () => {
  try {
    await simulateDelay();
    const response = await fetch(`${API_BASE_URL}/users`);
    const users = await handleResponse(response);
    
    return users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: user.company?.name || '',
      street: user.address?.street || '',
      city: user.address?.city || '',
      zipcode: user.address?.zipcode || ''
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users. Please try again later.');
  }
};

export const getUserById = async (id) => {
  try {
    await simulateDelay();
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    const user = await handleResponse(response);
    
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: user.company?.name || '',
      street: user.address?.street || '',
      city: user.address?.city || '',
      zipcode: user.address?.zipcode || ''
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user details. Please try again later.');
  }
};

export const createUser = async (userData) => {
  try {
    await simulateDelay();
    
    const apiData = {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
      company: {
        name: userData.company
      },
      address: {
        street: userData.street,
        city: userData.city,
        zipcode: userData.zipcode
      }
    };

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    });

    const newUser = await handleResponse(response);
    
    return {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      website: newUser.website,
      company: newUser.company?.name || userData.company,
      street: newUser.address?.street || userData.street,
      city: newUser.address?.city || userData.city,
      zipcode: newUser.address?.zipcode || userData.zipcode
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user. Please try again later.');
  }
};

export const updateUser = async (id, userData) => {
  try {
    await simulateDelay();
    
    const apiData = {
      id: id,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
      company: {
        name: userData.company
      },
      address: {
        street: userData.street,
        city: userData.city,
        zipcode: userData.zipcode
      }
    };

    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    });

    const updatedUser = await handleResponse(response);
    
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      website: updatedUser.website,
      company: updatedUser.company?.name || userData.company,
      street: updatedUser.address?.street || userData.street,
      city: updatedUser.address?.city || userData.city,
      zipcode: updatedUser.address?.zipcode || userData.zipcode
    };
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user. Please try again later.');
  }
};

export const deleteUser = async (id) => {
  try {
    await simulateDelay();
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to delete user`);
    }

    return { success: true, id };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user. Please try again later.');
  }
};