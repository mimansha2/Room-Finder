import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/dyyhhmcv7/image/upload";
export const CLOUDINARY_UPLOAD_PRESET = "uthcikhk";

const useApi = (controllerName: string) => {
  const { user } = useAuth();

  const api = axios.create({
    // baseURL: "https://roomfinder-8v5p.onrender.com/api",
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000,
    headers: { Authorization: `Bearer ${user.token}` },
  });

  const get = async <T>(methodName: string) => {
    return await api.get<T>(`${controllerName}/${methodName}`);
  };

  const getById = async <T>(methodName: string, id: string) => {
    return methodName
      ? (await api.get<T>(`${controllerName}/${methodName}/${id}`)).data
      : (await api.get<T>(`${controllerName}/${id}`)).data;
  };

  const getList = async <T>(filterParam: any) => {
    const response = await api.get<T>(controllerName, {
      params: {
        pagination: filterParam.pagination,
        // filters: filterParam.filters,
        // order: filterParam.order,
      },
    });
    return response.data as T[];
  };

  const post = async <T>(methodName: string, data: T) => {
    console.log(import.meta.env.VITE_BASE_URL);
    return await api.post(`${controllerName}/${methodName}`, data);
  };

  const put = async <T>(methodName: string, data: T) => {
    return await api.put(`${controllerName}/${methodName}`, data);
  };

  const patch = async <T>(methodName: string, data: T) => {
    return await api.patch(`${controllerName}/${methodName}`, data);
  };

  const remove = async (id: string) => {
    return api.delete(`${controllerName}/${id}`);
  };

  return { get, getList, getById, post, put, remove, patch };
};

export default useApi;
