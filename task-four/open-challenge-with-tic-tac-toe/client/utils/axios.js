import axios from "axios";

let baseURL = "https://tic-tac-toe-pqxc.onrender.com";

const instance = axios.create({
  baseURL,
});

export default instance;
