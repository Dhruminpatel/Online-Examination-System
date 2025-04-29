// import { createContext, useContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [user, setUser] = useState('');
//   //  Store token in both state and localStorage
//   const storetokenInLS = servertoken => {
//     localStorage.setItem('token', servertoken);
//     setToken(servertoken); //  Update React state
//   };

//   //  Logout function to clear both state & storage
//   const LogoutUser = () => {
//     localStorage.removeItem('token');
//     setToken(null); // Set token to null to trigger re-render
//   };

//   //  Ensure state syncs with localStorage on re-render
//   useEffect(() => {
//     setToken(localStorage.getItem('token'));
//   }, []);

//   //  Convert token to boolean for login status
//   const isloggedIn = !!token;
//   console.log('is logged in ?', isloggedIn);

//   //JWT Authentication- currently logged in user data

//   const userAuthentication = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/user', {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log('user data ', data.userData);
//         setUser(data.userData);
//       }
//     } catch (error) {
//       console.log('error fetching data');
//     }
//   };
//   useEffect(() => {
//     userAuthentication();
//   }, []); // ✅ Re-run when `token` changes

//   return (
//     <AuthContext.Provider
//       value={{ isloggedIn, storetokenInLS, LogoutUser, user }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error('useAuth must be used inside AuthProvider');
//   }
//   return authContextValue;
// };

import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState('');

  const storetokenInLS = servertoken => {
    localStorage.setItem('token', servertoken);
    setToken(servertoken);
  };

  const LogoutUser = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.reload();
    window.location.href('/login');
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const isloggedIn = !!token;
  console.log('is logged in ?', isloggedIn);

  const userAuthentication = async () => {
    if (!token) return; // ✅ Fix: Prevent unnecessary API calls

    try {
      const response = await fetch('http://localhost:5000/api/auth/user', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('user data ', data.userData);
        setUser(data.userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log('error fetching data');
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]); // ✅ Fix: Run authentication only when token changes

  return (
    <AuthContext.Provider
      value={{ isloggedIn, storetokenInLS, LogoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return authContextValue;
};
