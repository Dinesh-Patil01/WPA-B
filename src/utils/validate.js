export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateRequiredFields = (fields) => {
    const missingFields = [];
    for (const [key, value] of Object.entries(fields)) {
      if (!value) missingFields.push(key);
    }
    return missingFields;
  };
  