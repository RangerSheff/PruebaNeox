import { Injectable, Logger } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userDeleteRequest, userFull, userUpdateRequest } from '../dto/user.dto';
import {
  CREATE_FAIL,
  CREATE_SUCCESS,
  DELETE_FAIL,
  DELETE_SUCCESS,
  FIND_ALL_NOT_FOUND_RECORDS,
  FIND_ALL_SUCCESS,
  FIND_ONE_NOT_FOUND_RECORDS,
  FIND_ONE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_INNACTIVE_USER,
  UPDATE_SUCCESS,
} from '../constants/response.constants';
import { CryptoService } from '@app/shared/crypto/crypto';
import { GenericResponseDto } from '@app/shared/dto/generic-response.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly crypto: CryptoService,
  ) {}

  private async encriptPassword(value: string) {
    return await this.crypto.hashPassword(value);
  }

  async findAll() {
    const findRecords = await this.userRepository.find();
    this.logger.verbose(findRecords);
    if (findRecords.length === 0) {
      return FIND_ALL_NOT_FOUND_RECORDS;
    }
    FIND_ALL_SUCCESS.data = findRecords;
    return FIND_ALL_SUCCESS;
  }

  async findOne(email: string): Promise<GenericResponseDto<User>> {
    const findRecord = await this.userRepository.findOneBy({ email });
    this.logger.verbose(findRecord);
    if (!findRecord) {
      return FIND_ONE_NOT_FOUND_RECORDS;
    }
    FIND_ONE_SUCCESS.data = findRecord;
    return FIND_ONE_SUCCESS;
  }

  async create(userCreated: userFull) {
    userCreated.password = await this.encriptPassword(userCreated.password);
    const createRecord = await this.userRepository.save(userCreated);
    this.logger.verbose(createRecord);
    if (!createRecord) {
      return CREATE_FAIL;
    }
    CREATE_SUCCESS.data = createRecord;
    return CREATE_SUCCESS;
  }

  async update(email: string, userUpdated: userUpdateRequest, validation: boolean) {
    const { data: user } = await this.findOne(email);
    if (!user.active && validation) return UPDATE_INNACTIVE_USER;

    userUpdated.password = await this.encriptPassword(userUpdated.password);
    const updateRecord = await this.userRepository.update(email, userUpdated);
    this.logger.verbose(updateRecord);
    if (updateRecord.affected === 0) {
      return UPDATE_FAIL;
    }
    const { data: record } = await this.findOne(email);
    UPDATE_SUCCESS.data = record;
    return UPDATE_SUCCESS;
  }

  async remove(email: userDeleteRequest) {
    const deleteRecord = await this.userRepository.delete(email);
    this.logger.verbose(deleteRecord);
    if (deleteRecord.affected === 0) {
      return DELETE_FAIL;
    }
    return DELETE_SUCCESS;
  }
}
