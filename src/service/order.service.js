import { getApiForFormData } from "../utils/axios";
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
