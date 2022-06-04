enum Role {
  ADMIN,
  USER,
}

type Props = {
  role: Role
  fullName: string
  username: string
  email: string
  password: string
  profilePic: string
}

class User {
  id: string
  props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    this.id = id || crypto.randomUUID()
  }
}

export default User
