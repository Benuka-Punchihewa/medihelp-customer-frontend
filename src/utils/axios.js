import axios from "axios";
import constants from "../constants";

// import store from "../store";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzExZmU1ZmMwMmM0YzcwNzQ3Yzc3MzMiLCJlbWFpbCI6InN1bWVkaGFAZ21haWwuY29tIiwicm9sZSI6InBoYXJtYWN5IG93bmVyIiwicGhhcm1hY2llcyI6W3siX2lkIjoiNjMxMjA1NWQzNjFlMWJhYjY0OTZmZDMyIiwibmFtZSI6IlNhbWFyYXNpbmdoYSBQaGFybWFjeSJ9LHsiX2lkIjoiNjMxNzdmNzM0NDgxZDU0ZTE3M2IyMDY3IiwibmFtZSI6IkdheWFuIFBoYXJtYWN5In0seyJfaWQiOiI2MzE4YzdhMzhhOWQ1ODJjNDk5MDJiNTgiLCJuYW1lIjoiTmV3IENlbnRyYWwgUGhhcm1hY3kgIn0seyJfaWQiOiI2MzE4Yzg3ZThhOWQ1ODJjNDk5MDJiNjIiLCJuYW1lIjoiU2FmZXdheSBDaGVtaXN0IFBoYXJtYWN5In0seyJfaWQiOiI2MzE4Yzk4YThhOWQ1ODJjNDk5MDJiNmUiLCJuYW1lIjoiT3NpbCBQaGFybWFjeSJ9LHsiX2lkIjoiNjMxYjRjZTQzYmNiYmVhOGRmYzhkZTI5IiwibmFtZSI6IkdheW5hIFBoYXJtYWN5In0seyJfaWQiOiI2MzFiNTRhMjNiY2JiZWE4ZGZjOGRlNDEiLCJuYW1lIjoiR2FnYW5hIHBoYXJtYWN5In0seyJfaWQiOiI2MzFiNTc4NzNiY2JiZWE4ZGZjOGRlNTYiLCJuYW1lIjoiTmltYSBwaGFybWFjeSJ9LHsiX2lkIjoiNjMxYjU4YTgzYmNiYmVhOGRmYzhkZTYxIiwibmFtZSI6IkdhbWEgcGhhcm1hY3kifSx7Il9pZCI6IjYzMWI1YWI1M2JjYmJlYThkZmM4ZGU2YyIsIm5hbWUiOiJHYW1hZ2UgcGhhcm1hY3kifSx7Il9pZCI6IjYzMWI1Y2M3M2JjYmJlYThkZmM4ZGU3ZSIsIm5hbWUiOiJOdXdhbiBwaGFybWFjeSJ9LHsiX2lkIjoiNjMxYjVlZGIzYmNiYmVhOGRmYzhkZTk4IiwibmFtZSI6IkthbWFsIHBoYXJtYWN5In0seyJfaWQiOiI2MzFiNjBiNzNiY2JiZWE4ZGZjOGRlYjEiLCJuYW1lIjoiR2FnYW5hIHBoYXJtYWN5In1dLCJpYXQiOjE2NjM2MTA1NzcsImV4cCI6MTY2MzY5Njk3N30.nHE5iiS3XE7Uuk3oNAyTQIE38ONlXskWbQmfc7NKWHI";

export const getApi = () => {
  //   const newState = store.getState();
  //   const token = newState ? newState.auth.token : null;
  return axios.create({
    baseURL: constants.API_BASE_URL,
    headers: {
      Authorization: token ? "Bearer " + token : null,
      "Content-type": "application/json",
    },
  });
};

export const getApiForFormData = () => {
  //   const newState = store.getState();
  //   const token = newState ? newState.auth.token : null;
  return axios.create({
    baseURL: constants.API_BASE_URL,
    headers: {
      Authorization: token ? "Bearer " + token : null,
      "Content-type": "multipart/form-data",
    },
  });
};
