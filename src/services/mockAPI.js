// src/services/mockAPI.js
const mockUsers = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    phone: '1234567890',
  },
];

const mockAPI = {
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          u => u.email === credentials.email && 
          u.password === credentials.password
        );
        
        if (user) {
          resolve({
            data: {
              token: 'fake-jwt-token',
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
              },
            },
          });
        } else {
          reject({ response: { data: { message: 'Invalid credentials' } } });
        }
      }, 1000);
    });
  },

  signup: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: mockUsers.length + 1,
          ...userData,
        };
        mockUsers.push(newUser);
        resolve({
          data: {
            message: 'User created successfully',
            user: newUser,
          },
        });
      }, 1000);
    });
  },
};

export default mockAPI;