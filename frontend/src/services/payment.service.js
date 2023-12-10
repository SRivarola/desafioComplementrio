import { getHeaders } from "../utils/http";
import AxiosClient from "./axiosClient";

export default class PaymentService {
  constructor() {
    this.client = new AxiosClient();
  }
  createPaymentIntent = ({ amount, callbackSuccess, callbackError }) => {
    const requestInfo = {
      url: `${import.meta.env.VITE_BASE_URL}/payments/payment-intents/${amount}`,
      callbackSuccess,
      callbackError,
    };
    this.client.makePostRequest(requestInfo);
  };

  pay = ({ body, callbackSuccess, callbackError }) => {
    const requestInfo = {
      url: `${import.meta.env.VITE_BASE_URL}/payments/checkout`,
      body,
      config: getHeaders(),
      callbackSuccess,
      callbackError,
    };
    this.client.makePostRequest(requestInfo);
  };
}
