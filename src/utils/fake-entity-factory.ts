import Animal from "../domain/entities/animal";
import User from "../domain/entities/user";

export function createFakeUser(props: any, id?: string) {
  const finalProps = Object.assign(
    {
      username: "testUsernameAdmin",
      password: "test",
      email: "test@example.com",
      fullName: "John Smith",
      profilePic: "",
    },
    props
  );
  return {
    props: finalProps,
    entity: new User.Entity(finalProps, id),
  };
}

export function createFakeAnimal(props: any, id?: string) {
  const finalProps = Object.assign(
    {
      name: "Bibi",
      colors: ["black", "white"],
      description: "",
      type: Animal.Type.CAT,
      photo: "",
      lastSeenLocation: "",
    },
    props
  );

  return {
    props: finalProps,
    entity: new Animal.Entity(finalProps, id),
  };
}
