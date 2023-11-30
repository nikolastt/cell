import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
import { router } from "expo-router";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await getItemAsync(TOKEN_KEY);

      console.log(token, "token");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      console.log(`${process.env.EXPO_PUBLIC_API_URL}/api/users`);
      return await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/users`, {
        email,
        password,
      });
    } catch (err) {
      console.log(err);
      return { error: true, msg: (err as any).message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth`,
        { email, password }
      );

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await setItemAsync(TOKEN_KEY, result.data.token);

      return result;
    } catch (err) {
      console.log(err);
      return { error: true, msg: (err as any).message };
    }
  };

  const logout = async () => {
    await deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    router.push("/(auth)/login");

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState: authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
