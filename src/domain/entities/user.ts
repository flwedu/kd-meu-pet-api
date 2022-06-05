import crypto from "crypto";

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
      this.props = props;
      this.id = id || crypto.randomUUID();
    }
  }
}

export default User;
