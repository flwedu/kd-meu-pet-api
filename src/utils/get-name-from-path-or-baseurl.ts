import { Request } from "express";
import { EntityNames } from "../domain/entities";
import { OperationError } from "../domain/errors/operation-error";

export function getNameFromPathOrBaseUrl(
  request: Partial<Request>
): EntityNames {
  function findNameInUrl(url: string): EntityNames {
    const findPathRegex = /api\/(\w+)\/?/gi;
    const matchResults = findPathRegex.exec(url);
    if (!matchResults) {
      throw new OperationError(
        `Could not extract entity name from path: ${url}`
      );
    }
    return matchResults[1] as EntityNames;
  }

  const url = checkValidUrlPath(request.path) ? request.path : request.baseUrl;
  return findNameInUrl(url!);
}

function checkValidUrlPath(url?: string): boolean {
  if (url === undefined || url === null || url === "") return false;

  const findPathRegex = /api\/(\w+)\/?/gi;
  return findPathRegex.test(url);
}
