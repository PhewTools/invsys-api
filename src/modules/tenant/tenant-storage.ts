import { AsyncLocalStorage } from "async_hooks";

export interface TenantContext {
    readonly tenantId: string;
    readonly schemaName: string;
}

export const tenantStorage = new AsyncLocalStorage<TenantContext>();