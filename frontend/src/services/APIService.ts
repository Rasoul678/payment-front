import { API_URL } from "@/constants";
import { APIResponseType, PaymentRType, PaymentsListRType } from "@/types";
import axios from "axios";

type IParams = {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
};

class APIService {
  static async fetchPayments(params: IParams): Promise<APIResponseType> {
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

  static async fetchPaymentById(id: string): Promise<APIResponseType> {
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
