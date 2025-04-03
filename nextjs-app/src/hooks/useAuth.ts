import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../store/slices/authSlice";
import { auth } from "../../firebaseConfig"; // Your Firebase config
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<null | { email: string }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate login (replace with Firebase auth logic)
      if (email === "test@example.com" && password === "password") {
        setUser({ email });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout, loading, error };
};
