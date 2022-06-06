import crypto from "crypto";

namespace Animal {
  export enum Type {
    CAT,
    DOG,
    BIRD,
    HORSE,
    OTHER,
  }

  export type Props = {
    name: string;
    colors: string[];
    description: string;
    photo: string;
    lastSeenLocation: string;
    type: Type;
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

export default Animal;
