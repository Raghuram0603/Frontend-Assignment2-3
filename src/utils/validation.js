// Validation utility functions
export const validateUser = (userData) => {
  const errors = {};

  if (!userData.name || userData.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (userData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  } else if (userData.name.trim().length > 50) {
    errors.name = 'Name cannot exceed 50 characters';
  }

  if (!userData.username || userData.username.trim().length === 0) {
    errors.username = 'Username is required';
  } else if (userData.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  } else if (userData.username.trim().length > 20) {
    errors.username = 'Username cannot exceed 20 characters';
  } else if (!/^[a-zA-Z0-9_]+$/.test(userData.username.trim())) {
    errors.username = 'Username can only contain letters, numbers, and underscores';
  }

  if (!userData.email || userData.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(userData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (userData.company && userData.company.trim().length > 100) {
    errors.company = 'Company name cannot exceed 100 characters';
  }

  if (!userData.street || userData.street.trim().length === 0) {
    errors.street = 'Street address is required';
  } else if (userData.street.trim().length > 100) {
    errors.street = 'Street address cannot exceed 100 characters';
  } 

  if (!userData.city || userData.city.trim().length === 0) {
    errors.city = 'City is required';
  } else if (userData.city.trim().length > 50) {
    errors.city = 'City name cannot exceed 50 characters';
  }

  if (!userData.zipcode || userData.zipcode.trim().length === 0) {
    errors.zipcode = 'Zipcode is required';
  } else if (!/^[0-9-]+$/.test(userData.zipcode.trim())) {
    errors.zipcode = 'Zipcode can only contain numbers and hyphens';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const isValidEmail = (email) => {
  return email.includes('@') && email.indexOf('.') > email.indexOf('@');
};

export const sanitizeUserData = (userData) => {
  const sanitized = {};
  
  Object.keys(userData).forEach(key => {
    if (typeof userData[key] === 'string') {
      sanitized[key] = userData[key].trim();
    } else {
      sanitized[key] = userData[key];
    }
  });

  return sanitized;
};