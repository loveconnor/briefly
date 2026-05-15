declare module "pg" {
  export type QueryResultRow = Record<string, unknown>

  export interface QueryResult<R extends QueryResultRow = QueryResultRow> {
    rows: R[]
    rowCount: number | null
  }

  export interface PoolClient {
    query<R extends QueryResultRow = QueryResultRow>(
      text: string,
      values?: unknown[],
    ): Promise<QueryResult<R>>
    release(): void
  }

  export class Pool {
    constructor(config?: { connectionString?: string })
    connect(): Promise<PoolClient>
    query<R extends QueryResultRow = QueryResultRow>(
      text: string,
      values?: unknown[],
    ): Promise<QueryResult<R>>
  }
}
