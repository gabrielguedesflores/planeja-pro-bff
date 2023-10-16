import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../domain/service/user/user.service';
import { ILoginUserDTO } from '../../dto/User/login-user.dto';
import { Login } from '../../../infrastructure/schema/login/login.schema';

@ApiTags('/token')
@Controller('token/v1')
export class TokenController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }
  
  @Post('login')
  @ApiOperation({ summary: 'Create token' })
  @ApiResponse({ status: 201, description: 'The token has been successfully created.' })
  @ApiBody({ type: Login })
  async login(@Body() loginUserDto: ILoginUserDTO) {
    // TODO: melhorar o processo de login
    const user = await this.userService.validateUser(loginUserDto.userEmail, loginUserDto.userPassword);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { email: user.userEmail, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
