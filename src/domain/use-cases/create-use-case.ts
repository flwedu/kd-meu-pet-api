import IRepository from "../../output/repositories/repository-interface";

function makeCreateUseCaseFn<T>(
  repository: IRepository<T>,
  createFn: (_: any) => any
) {
  return async (props: any) => {
    const entity = createFn(props);
    return repository.save(entity);
  };
}

export default makeCreateUseCaseFn;
