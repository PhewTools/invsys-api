import { Body, Controller, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const result = await this.authService.login(dto);
        if(result){
            return {
                access_token: result.accessToken
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}   