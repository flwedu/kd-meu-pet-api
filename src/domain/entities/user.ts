import crypto from "crypto";
import { checkEmail, checkNotNull, checkText } from "../../utils/validate";

namespace User {
  export enum Role {
    ADMIN,
    USER,
  }

  export type Props = {
    role: Role;
    fullName: string;
    username: string;
    email: string;
    password: string;
    profilePic: string;
  };

  export class Entity {
    id: string;
    props: Props;

    constructor(props: Props, id?: string) {
      checkNotNull(props);
      checkEmail(props.email);
      checkText(1, 30, props.username);
      checkText(1, 50, props.fullName);

      this.props = props;
      this.id = id || crypto.randomUUID();
    }
  }
}

export default User;
