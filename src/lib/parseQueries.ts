import type { BaseQueries } from '../types/base.types.ts';

function parseQueries<T extends BaseQueries>(query: T) {
  const { page = 1, size = 100, ...rest } = query;

  return {
    page: Number(page),
    size: Number(size),
    rest,
  };
}

export { parseQueries };
