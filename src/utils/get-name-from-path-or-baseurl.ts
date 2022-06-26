import { Request } from "express";
import { OperationError } from "../domain/errors/operation-error";
import { EntityName } from "./entity-builder";

export function getNameFromPathOrBaseUrl(
  request: Partial<Request>
): EntityName {
  function findNameInUrl(url: string): EntityName {
    const findPathRegex = /api\/(\w+)\/?/gi;
    const matchResults = findPathRegex.exec(url);
    if (!matchResults) {
      throw new OperationError(
        `Could not extract entity name from path: ${url}`
      );
    }
    return matchResults[1] as EntityName;
  }

  const url = request.path!.length > 1 ? request.path : request.baseUrl;
  return findNameInUrl(url!);
}
