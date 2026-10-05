import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AUTH_ROLES = [
  { id: 'radiologist', label: 'Radiologist / Imaging Specialist' },
  { id: 'oncologist', label: 'Oncologist' },
  { id: 'physician', label: 'General Physician / Clinician' },
  { id: 'researcher', label: 'Medical AI Researcher' },
  { id: 'patient', label: 'Patient / Health Consumer' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('medivision_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('medivision_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('medivision_user');
    }
  }, [user]);

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    
    await new Promise(res => setTimeout(res, 600));

    const loggedUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email: email,
      role: 'Radiologist / Imaging Specialist',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      provider: 'email',
      createdAt: new Date().toISOString(),
    };

    setUser(loggedUser);
    return loggedUser;
  };

  const signup = async ({ name, email, password, role }) => {
    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }

    await new Promise(res => setTimeout(res, 600));

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      role: role || 'General Physician / Clinician',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      provider: 'email',
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    return newUser;
  };

  const loginWithGoogle = async () => {
    await new Promise(res => setTimeout(res, 800));

    const googleUser = {
      id: 'goog_' + Date.now(),
      name: 'Dr. Sarah Lin, MD',
      email: 'sarah.lin@medvision-ai.org',
      role: 'Radiologist / Imaging Specialist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150',
      provider: 'google',
      googleId: '109283749238472938472',
      createdAt: new Date().toISOString(),
    };

    setUser(googleUser);
    return googleUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medivision_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
