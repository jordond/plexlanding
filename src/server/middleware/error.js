export function errorMiddleware() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.type = 'application/json';
      ctx.status = err.status || 500;
      ctx.body = { message: err.message, status: ctx.status, error: err };
      ctx.app.emit('error', err, ctx);
    }
  };
}

export default errorMiddleware;
