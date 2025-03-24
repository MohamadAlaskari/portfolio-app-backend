import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersExceptionFilter } from './filters/users-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/common/utils/enums';
import { Roles } from './decorators/roles.decorator';
import { Current_User } from 'src/common/decorators/current-user.decorator';
import { JWTPayloadTypes } from 'src/common/utils/types';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
@UseFilters(UsersExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER) // Admins & Benutzer können bearbeiten
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Current_User() payload: JWTPayloadTypes,
  ) {
    if (payload.role !== UserRole.ADMIN && payload.id !== id) {
      throw new Error('Access denied. You can only update your own profile.');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
