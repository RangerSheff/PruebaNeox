import { GenericResponseDto } from '@app/shared/dto/generic-response.dto';

export const AUTH_SUCCESS = new GenericResponseDto<unknown>(0, 'Login Success');
export const AUTH_EMAIL_FAIL = new GenericResponseDto<unknown>(9, 'Email Failed');
export const AUTH_PASSWORD_FAIL = new GenericResponseDto<unknown>(10, 'Password Failed');
export const AUTH_INNACTIVE_USER = new GenericResponseDto<unknown>(11, 'User Innactive contact to Admin');
export const AUTH_JWT_FAIL = new GenericResponseDto<unknown>(12, 'Generic JWT Failed');

export const RECOVERY_SUCCESS = new GenericResponseDto<unknown>(0, 'Generic Code and Send Email Success');
export const RECOVERY_EMAIL_FAIL = new GenericResponseDto<unknown>(13, 'Email Failed');
export const RECOVERY_GENERATE_CODE_FAIL = new GenericResponseDto<unknown>(14, 'Generic Code Failed');
export const RECOVERY_SEND_EMAIL_FAIL = new GenericResponseDto<unknown>(15, 'Email Send Failed');

export const VALIDATE_SUCCESS = new GenericResponseDto<unknown>(0, 'New Password Success');
export const VALIDATE_EMAIL_FAIL = new GenericResponseDto<unknown>(13, 'Email Failed');
export const VALIDATE_GENERATE_CODE_EMAIL_FAIL = new GenericResponseDto<unknown>(
  14,
  'Generic Code not is equals to code email Failed',
);
export const VALIDATE_UPDATE_PASSWORD_FAIL = new GenericResponseDto<unknown>(
  15,
  'Update Password and Active User Failed',
);
