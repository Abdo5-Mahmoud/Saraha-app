import { userRoles } from "../../middleware/authentication.middleware.js";

export const endpoint = {
  profile: Object.values(userRoles),
  //   profile: [userRoles.Admin],
};
