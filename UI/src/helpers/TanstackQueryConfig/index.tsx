import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { notification } from "antd";
import { ReactNode } from "react";

interface TanstackQueryConfigProps {
  children: ReactNode;
}

const TanstackQueryConfig = (props: TanstackQueryConfigProps) => {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: 2, // Retry 2 times if api call is failed
        retryDelay: 1000 * 1,
        retryOnMount: true,
        gcTime: 1000 * 60 * 3, // Cache time set to 3 minutes
      },
      mutations: {
        retry: 2,
        retryDelay: 1000 * 1,
      },
    },
    queryCache: new QueryCache({
      onSuccess: (data, query) => {
        if (query.meta?.showMessage === false) return;
        notification.success({
          message: (query.meta?.message as string) ?? "Success",
          placement: "bottomLeft",
        });
      },
      onError: (err: any) => {
        const errorMessage = err.response.data.message ?? "Error";
        notification.error({ message: errorMessage, placement: "bottomLeft" });
        console.log("ERROR");
      },
    }),
    mutationCache: new MutationCache({
      onSuccess: () => {
        notification.success({ message: "Success", placement: "bottomLeft" });
        console.log("SUCCESS");
      },
      onError: (error: any) => {
        notification.error({
          description: error.response.data.message ?? "ERROR OCCURED",
          message: "Error",
          placement: "bottomLeft",
        });
        console.log("ERROR in mutation");
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default TanstackQueryConfig;
