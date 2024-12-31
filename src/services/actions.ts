import { apiClient } from "./axios";
import { Routes } from "./routes";
import { T_AddMCQForm } from "../schema/mcq-schema";

const getMcqs = () => {
  return apiClient({
    url: Routes.GET_MCQS.URL,
    method: Routes.GET_MCQS.METHOD,
  });
};

const addMcqs = (data: {mcqs: T_AddMCQForm[]}) => {
  return apiClient({
    url: Routes.ADD_MCQS.URL,
    method: Routes.ADD_MCQS.METHOD,
    data,
  });
};

export { getMcqs, addMcqs };
