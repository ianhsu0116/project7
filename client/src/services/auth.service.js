import axios from "axios";
const APL_URL = "http://localhost:8787/api/user";

class AuthService {
  login() {}
  logout() {}
  register(username, email, password, role) {
    return axios.post(APL_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {}
}

export default new AuthService();