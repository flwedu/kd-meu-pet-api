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

  const url = checkValidUrlPath(request.path) ? request.path : request.baseUrl;
  return findNameInUrl(url!);
}

function checkValidUrlPath(url?: string): boolean {
  if (url === undefined || url === null || url === "") return false;

  const findPathRegex = /api\/(\w+)\/?/gi;
  return findPathRegex.test(url);
}
