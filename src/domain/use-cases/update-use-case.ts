import IRepository from "../../output/repositories/repository-interface";

export default function makeUpdateUseCaseFn<T>(
  repository: IRepository<T>,
  createFn: (_: any, id: string) => any
) {
  return (props: any, id: string) => {
    const updated = createFn(props, id);
    return repository.update(updated, id);
  };
}
