import { create } from "apisauce";

const client = create({
  baseURL: "http://192.168.1.108:9000",
});

export default client;
