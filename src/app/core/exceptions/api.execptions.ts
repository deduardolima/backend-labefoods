import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function ApiCommonResponses() {
  return applyDecorators(
    ApiUnauthorizedResponse({ description: 'Não autorizado' }),
    ApiBadRequestResponse({ description: 'Requisição inválida' }),
  );
}