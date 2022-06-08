import crypto from "crypto";
import { checkNotNull } from "../../utils/validate";

namespace Occurrence {
  export enum Type {
    DISAPPEARANCE,
    SIGHTING,
    FOR_ADOPTION,
  }

  export type Props = {
    type: Type;
    geoLocation: string;
    animalId?: string;
    userId: string;
  };

  export class Entity {
    id: string;
    props: Props;

    constructor(props: Props, id?: string) {
      checkNotNull(props);

      this.props = props;
      this.id = id || crypto.randomUUID();
    }
  }
}

export default Occurrence;
