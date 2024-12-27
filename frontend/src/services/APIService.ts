import { API_URL } from "@/constants";
import { APIResType, QueryParams } from "@/types";
import axios, { AxiosError } from "axios";

type ReturnType<T> = Promise<APIResType<T>>;

class APIService {
  static async fetchPayments<R>(params: Partial<QueryParams>): ReturnType<R> {
    const url = `${API_URL}/payments`;

    try {
      const { data: result, status } = await axios.get<R>(url, {
        params,
      });

      return { result, error: null, status };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          result: null,
          ...error.response?.data,
          status: error.response?.status,
        };
      } else {
        throw Error("Something went wrong!");
      }
    }
  }

  static async fetchPaymentById<T>(id: string): ReturnType<T> {
    const url = `${API_URL}/payments/${id}`;

    try {
      const { data: result, status } = await axios.get<T>(url);

      return { result, error: null, status };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          result: null,
          ...error.response?.data,
          status: error.response?.status,
        };
      } else {
        throw Error("Something went wrong!");
      }
    }
  }
}

export default APIService;
