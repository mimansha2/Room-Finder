import { withAuthenticationRequired } from "@auth0/auth0-react";

export const AuthenticationGuard = ({ component }: any) => {
  const Component: any = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Redirecting you to the login...</div>,
  });

  return <Component />;
};
