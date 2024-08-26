"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationParams = void 0;
const common_1 = require("@nestjs/common");
exports.PaginationParams = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { page = '1', limit = '6' } = request.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedPage) || parsedPage < 1) {
        throw new common_1.BadRequestException('Invalid page number');
    }
    if (isNaN(parsedLimit) || parsedLimit < 1) {
        throw new common_1.BadRequestException('Invalid limit');
    }
    return {
        page: parsedPage,
        limit: parsedLimit,
        offset: (parsedPage - 1) * parsedLimit,
    };
});
//# sourceMappingURL=pagination-params.decorator.js.map