import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/middleware/crud';
import { clientGet, clientUpdate, clientDelete } from '@/services/client';
import {
  clientGetSchema,
  clientUpdateSchema,
  clientDeleteSchema,
} from '@/services/client/clientValidation';

/**
 * @api {get} /internal/client/:id Get Client
 * @apiName GetClient
 * @apiGroup Client
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a specific client by ID
 *
 * @apiParam {String} id Client identifier
 *
 * @apiSuccess {Object} data Client data
 *
 * @apiError {String} NotFoundError Client not found
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedParams = clientGetSchema.parse({ id: req.params.id });

    const result = await clientGet(validatedParams.id);

    if (!result) {
      res.status(404).json(errorResponse('Cliente não encontrado'));
      return;
    }

    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {put} /internal/client/:id Update Client
 * @apiName UpdateClient
 * @apiGroup Client
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates a specific client
 *
 * @apiParam {String} id Client identifier
 * @apiParam {String} [nome_completo] Full name
 * @apiParam {String} [telefone] Main phone
 * @apiParam {String} [email] Email address
 *
 * @apiSuccess {Object} data Updated client data
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} NotFoundError Client not found
 * @apiError {String} ServerError Internal server error
 */
export async function putHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = clientUpdateSchema.parse({
      id: req.params.id,
      ...req.body,
    });

    const result = await clientUpdate(validatedData);

    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else if (error.message?.includes('não encontrado')) {
      res.status(404).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}

/**
 * @api {delete} /internal/client/:id Delete Client
 * @apiName DeleteClient
 * @apiGroup Client
 * @apiVersion 1.0.0
 *
 * @apiDescription Soft deletes a client (marks as inactive)
 *
 * @apiParam {String} id Client identifier
 *
 * @apiSuccess {Boolean} success Operation success
 *
 * @apiError {String} NotFoundError Client not found
 * @apiError {String} ServerError Internal server error
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validatedParams = clientDeleteSchema.parse({ id: req.params.id });

    await clientDelete(validatedParams.id);

    res.json(successResponse({ success: true }));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else if (error.message?.includes('não encontrado')) {
      res.status(404).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}
