import { Body, Controller, Patch, Post } from '@nestjs/common';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
    constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Patch('request-reset-password')
  requestResetPassword(@Body() requestResetPasswordDto: RequestResetPasswordDto): Promise<void> {
    return this.resetPasswordService.requestResetPassword(requestResetPasswordDto);
  }
}
