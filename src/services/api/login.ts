import axios from "axios";
import { apiURL } from "../../enivironment";
import { LOGIN } from "../apiUrl";

export const getLogin = async (body: any) => {
  const res = await axios.post(apiURL + LOGIN, body);
  return res.data;
};

// export const getInviteLogin = async (body: any) => {
//   const res = await axios.post(
//     `${apiURL}${INVITE_LOGIN}${body.token}/`,
//     body.values
//   );
//   return res.data;
// };
