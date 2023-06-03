import { create } from "apisauce";

const client = create({
  baseURL: "http://192.168.1.140:9000",
});

export default client;
