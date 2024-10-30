// src/city/decorators/pagination-params.decorator.ts
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export interface Pagination {
  page: number;
  limit: number;
  size: number;
  offset: number;
  hidden?: boolean;
}

export const PaginationParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { page = '1', limit = '5', hidden } = request.query;

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    if (isNaN(parsedPage) || parsedPage < 1) {
      throw new BadRequestException('Invalid page number');
    }

    if (isNaN(parsedLimit) || parsedLimit < 1) {
      throw new BadRequestException('Invalid limit');
    }

    // Parse hidden parameter if provided
    let parsedHidden: boolean | undefined;
    if (hidden !== undefined) {
      if (hidden === 'true') {
        parsedHidden = true;
      } else if (hidden === 'false') {
        parsedHidden = false;
      } else {
        throw new BadRequestException('Invalid hidden value');
      }
    }

    const size = parsedLimit; // Size is equal to limit here

    return {
      page: parsedPage,
      limit: parsedLimit,
      size,
      offset: (parsedPage - 1) * parsedLimit,
      hidden: parsedHidden, // Include hidden
    };
  },
);
