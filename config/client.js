import { create } from "apisauce";

// server: http://167.71.105.243/

const client = create({
  baseURL: "http://192.168.1.108:9000",
});

export default client;
