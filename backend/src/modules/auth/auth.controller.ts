import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import LoginUserDto from './dto/login.user.dto';
import { GoogleOAuthGuard } from './guards/google.oauth.guard';
import { Response } from 'express';
import configs from 'src/configs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  handlerLogin() {
    console.log('log');
    return this.authService.handlerLogin();
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.googleLogin(req.user);
    res.redirect(`${configs.frontend_url}/oauth?token=${token}`);
  }
}
