import crypto from "crypto";

namespace Occurence {
  export enum Type {
    DISAPPEARANCE,
    SIGHTING,
    FOR_ADOPTION,
  }

  export type Props = {
    type: Type;
    geoLocation: string;
    animalId?: string;
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

export default Occurence;
