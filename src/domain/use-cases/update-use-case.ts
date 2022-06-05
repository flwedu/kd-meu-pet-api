import IRepository from "../../output/repositories/repository-interface";

function makeUpdateUseCaseFn<T>(
  repository: IRepository<T>,
  createFn: (_: any, id: string) => any
) {
  return async (props: any, id: string) => {
    const updated = createFn(props, id);
    return repository.update(updated, id);
  };
}

export default makeUpdateUseCaseFn;
