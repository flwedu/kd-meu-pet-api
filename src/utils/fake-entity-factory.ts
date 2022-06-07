import { faker } from "@faker-js/faker";
import Animal from "../domain/entities/animal";
import Occurrence from "../domain/entities/occurrence";
import User from "../domain/entities/user";

export function createFakeUser(props: any, id?: string) {
  const finalProps = Object.assign(
    {
      username: faker.internet.userName(),
      password: faker.internet.password(5),
      email: faker.internet.email(),
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      profilePic: faker.internet.avatar(),
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
      name: faker.animal.cat(),
      colors: ["black", "white"],
      description: faker.lorem.words(3),
      type: Animal.Type.CAT,
      photo: "",
      lastSeenLocation: faker.address.nearbyGPSCoordinate().join(),
    },
    props
  );

  return {
    props: finalProps,
    entity: new Animal.Entity(finalProps, id),
  };
}

export function createFakeOccurrence(props: any) {
  const finalProps = Object.assign(
    {
      type: Occurrence.Type.SIGHTING,
      geoLocation: faker.address.nearbyGPSCoordinate().join(),
    },
    props
  );

  return {
    props: finalProps,
    entity: new Occurrence.Entity(finalProps),
  };
}
