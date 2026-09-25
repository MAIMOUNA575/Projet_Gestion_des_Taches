import { Controller, Post, Body } from "@nestjs/common";
import { auth } from "../lib/auth.js";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

@AllowAnonymous()
@Controller("auth")
export class AuthController {
    @Post("register")
    async register(@Body() body: {
        name: string;
        email: string;
        password: string
    }) {
        const result = await auth.api.signUpEmail({
            body: {
                name: body.name,
                email: body.email,
                password: body.password
            },
        });
        return {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
        };
    }

    @Post("login")
    async login(@Body() body: { email: string; password: string }) {
        const result = await auth.api.signInEmail({
            body: {
                email: body.email,
                password: body.password
            }
        });
        return {
            access_token: result.token
        };
    }
}