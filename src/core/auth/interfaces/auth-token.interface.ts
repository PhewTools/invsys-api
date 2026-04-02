export interface AuthTokenPayload {
    readonly sub: string;
    readonly userFullName: string;
    readonly tenantId: string;
    readonly role: string;
    readonly email: string
}