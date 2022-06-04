import crypto from "crypto"

enum AnimalType {
  CAT,
  DOG,
  BIRD,
  HORSE,
  OTHER,
}

type Props = {
  name: string
  colors: string
  description: string
  photo: string
  lastSeenLocation: string
  type: AnimalType
}

class Animal {
  id: string
  props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    this.id = id || crypto.randomUUID()
  }
}

export default Animal
