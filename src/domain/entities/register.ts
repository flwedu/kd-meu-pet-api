enum RegisterType {
  DISAPPEARANCE,
  SIGHTING,
  FOR_ADOPTION,
}

type Props = {
  type: RegisterType
  geoLocation: string
  animalId?: string
}

class Register {
  id: string
  props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    this.id = id || crypto.randomUUID()
  }
}
