import { getApi, getApiForFormData } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const createOrder = async (data) => {
  const response = await getApiForFormData()
    .post("/orders", data)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const getAllOrders = async (page, limit, orderBy, status) => {
  const response = await getApi()
    .get("/orders", {
      params: {
        page,
        limit,
        orderBy,
        status,
      },
    })
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};
