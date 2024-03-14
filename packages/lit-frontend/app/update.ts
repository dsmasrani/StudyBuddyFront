import * as App from "./app";
import { serverPath } from "./components/root";
import { Profile } from "./models/profile";

const dispatch = App.createDispatch();
export default dispatch.update;

dispatch.addMessage(
  "GetProfile",
  (msg: App.Message, model: App.Model) => {
    const { userId } = msg as App.GetProfile;

    return fetch(serverPath(`/profile/${userId}`))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("No Keys Found, Please Enter some Keys");
        }
      })
      .then((json: unknown) => {
          if (json) 
            return json as Profile;
          return null;
      })
      .then((profile: Profile | null) => {
        return profile? App.updateProps({ profile }): App.noUpdate({});
      });
  }
);