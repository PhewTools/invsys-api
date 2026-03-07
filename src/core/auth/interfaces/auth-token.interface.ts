export interface AuthTokenPayload {
    readonly sub: string;
    readonly tenantId: string;
    readonly role: string;
    readonly email: string
}