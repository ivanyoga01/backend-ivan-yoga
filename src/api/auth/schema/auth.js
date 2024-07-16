exports.loginReponse = (userData) => {
  const data = {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    role: userData.role,
  };
  return data;
};
