import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (_: undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.user.id;
    return id;
  },
);
