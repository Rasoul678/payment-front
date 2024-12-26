import { API_URL } from "@/constants";
import {
  APIResType,
  PaymentRType,
  PaymentsListRType,
  QueryParams,
} from "@/types";
import axios from "axios";

class APIService {
  static async fetchPayments(
    params: QueryParams
  ): Promise<APIResType<PaymentsListRType>> {
    try {
      const { data: result, status } = await axios.get<PaymentsListRType>(
        `${API_URL}/payments`,
        {
          params,
        }
      );

      return { result, error: null, status };
    } catch (error: any) {
      return {
        result: null,
        ...error.response.data,
        status: error.response.status,
      };
    }
  }

  static async fetchPaymentById(id: string): Promise<APIResType<PaymentRType>> {
    try {
      const { data: result, status } = await axios.get<PaymentRType>(
        `${API_URL}/payments/${id}`
      );

      return { result, error: null, status };
    } catch (error: any) {
      return {
        result: null,
        ...error.response.data,
        status: error.response.status,
      };
    }
  }
}

export default APIService;
