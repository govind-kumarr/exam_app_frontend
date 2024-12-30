import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidXNlcl9pZCI6IjY2ZTgxOGJhYzlhMGFlYjczYzUyMmE1NiIsImlhdCI6MTczNTU0MjA1MiwiZXhwIjoxNzM1NTU2NDUyfQ.XQaA0QFStqBYzJV28iu_ieaBzvTi1mPFQMIpbfPSoBw",
  },
});

export { apiClient };
