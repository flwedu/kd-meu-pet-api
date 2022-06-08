import { Response } from "express";

export function createSuccessResponse(res: Response) {
  function ok(content: any) {
    return res.status(200).json(content);
  }

  function created(id: string) {
    return res
      .status(201)
      .json({ message: `created successfully with id ${id}` });
  }

  function deleted(id: string) {
    return res.status(202).json({ message: `id ${id} deleted successfully` });
  }

  return { ok, created, deleted };
}
