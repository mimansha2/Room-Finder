import { useAuth0, User } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

export interface UserWithPermissionAndToken {
  permissions: string[];
  token: string;
}

interface AuthContextType {
  user: UserWithPermissionAndToken;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, getAccessTokenSilently, logout, isLoading, isAuthenticated } =
    useAuth0();
  const [enhancedDetailUser, setEnhancedDetailUser] =
    useState<UserWithPermissionAndToken>();

  const getAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      const decoded: any = jwtDecode(token);
      setEnhancedDetailUser({
        token: token,
        permissions: decoded.permissions,
      });
    } catch (error) {
      console.log("error in getting token", error);
      logout({
        logoutParams: {
          returnTo: `${window.location.origin}/public`,
        },
      });
    }
  };

  useEffect(() => {
    getAccessToken();
  }, [user]);

  if (isLoading) {
    return <h1>Getting user information...</h1>;
  }

  if (!enhancedDetailUser) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user: enhancedDetailUser }}>
      {enhancedDetailUser && isAuthenticated ? children : <></>}
    </AuthContext.Provider>
  );
};
