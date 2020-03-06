import React, { createContext, useState } from "react";
import { AsyncStorage } from "react-native";

type User = null | { username: string };

export const AuthContext = createContext<{
  user: User;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {}
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: async () => {
          const fakeUser = { username: "rotimi" };
          setUser(fakeUser);
          await AsyncStorage.setItem("user", JSON.stringify(fakeUser));
        },
        logout: async () => {
          setUser(null);
          await AsyncStorage.removeItem("user");
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
