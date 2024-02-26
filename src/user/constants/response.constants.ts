import { GenericResponseDto } from '@app/shared/dto/generic-response.dto';
import { User } from '../entities/user.entity';

export const FIND_ALL_SUCCESS = new GenericResponseDto<User[]>(0, 'Find All Success');
export const FIND_ALL_NOT_FOUND_RECORDS = new GenericResponseDto<User[]>(1, 'Not Found Records of Users');

export const FIND_ONE_SUCCESS = new GenericResponseDto<User>(0, 'Find Success');
export const FIND_ONE_NOT_FOUND_RECORDS = new GenericResponseDto<User>(2, 'Not Found Record of User');

export const CREATE_SUCCESS = new GenericResponseDto<User>(0, 'Create Success');
export const CREATE_FAIL = new GenericResponseDto<User>(3, 'Failed to Create Record of User');

export const UPDATE_SUCCESS = new GenericResponseDto<User>(0, 'Update Success');
export const UPDATE_INNACTIVE_USER = new GenericResponseDto<unknown>(4, 'User Innactive contact to Admin');
export const UPDATE_FAIL = new GenericResponseDto<User>(5, 'Failed to Update Record of User');

export const DELETE_SUCCESS = new GenericResponseDto<User>(0, 'Delete Success');
export const DELETE_FAIL = new GenericResponseDto<User>(6, 'Failed to Delete Record of User');
