import type { Identifier } from "sequelize";

interface BaseQueries {
  page?: number;
  size?: number;
}

interface BaseParams {
  id: Identifier;
}

export type { BaseQueries, BaseParams };