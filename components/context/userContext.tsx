"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: any;
}) {
  // We initialize the state with the data passed from the Server Component
  const [user, setUser] = useState(initialUser);

  const logout = () => {
    // Handle logout logic here (clear cookies, etc.)
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout } as any}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easy access
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
