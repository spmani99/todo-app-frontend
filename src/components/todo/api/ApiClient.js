import axios from "axios";

export const apiClient = axios.create({
  //baseURL: "http://localhost:5000",
  baseURL: " http://todo-app-env.eba-dgvrb8ii.ap-south-1.elasticbeanstalk.com/",
});
