import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/middleware/crud';
import { clientCreate, clientList, clientGet, clientUpdate, clientDelete } from '@/services/client';
import {
  clientCreateSchema,
  clientUpdateSchema,
  clientGetSchema,
  clientListSchema,
  clientDeleteSchema,
} from '@/services/client/clientValidation';

/**
 * @api {post} /internal/client Create Client
 * @apiName CreateClient
 * @apiGroup Client
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new client with the specified parameters
 *
 * @apiParam {String} nome_completo Full name of the client (3-100 characters)
 * @apiParam {String} [cpf] CPF document (11 digits, optional)
 * @apiParam {String} [data_nascimento] Birth date (ISO format, optional)
 * @apiParam {String} telefone Main phone number (required)
 * @apiParam {String} [telefone_alternativo] Alternative phone number (optional)
 * @apiParam {String} [email] Email address (optional)
 * @apiParam {Object} [endereco] Address object (optional)
 * @apiParam {String} [como_conheceu] How client found the barbershop (optional)
 *
 * @apiSuccess {String} id_cliente Client identifier
 * @apiSuccess {Date} data_cadastro Creation timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = clientCreateSchema.parse(req.body);

    const result = await clientCreate(validatedData);

    res.status(201).json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else if (error.message?.includes('CPF já cadastrado')) {
      res.status(409).json(errorResponse(error.message));
    } else if (error.message?.includes('Email já cadastrado')) {
      res.status(409).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /internal/client List Clients
 * @apiName ListClients
 * @apiGroup Client
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all clients with optional filters
 *
 * @apiParam {String} [status] Filter by status (Ativo/Inativo)
 * @apiParam {Number} [page] Page number for pagination
 * @apiParam {Number} [pageSize] Items per page
 *
 * @apiSuccess {Array} data Array of clients
 * @apiSuccess {Number} total Total number of clients
 *
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedQuery = clientListSchema.parse(req.query);

    const result = await clientList(validatedQuery);

    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else {
      next(error);
    }
  }
}
