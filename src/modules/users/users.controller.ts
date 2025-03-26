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
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JWTPayloadTypes } from 'src/common/utils/types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
//@UseGuards(AuthGuard)
//@ApiBearerAuth()
@UseFilters(UsersExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User', description: 'Creates a new user.' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @UseGuards(RolesGuard)
  //@Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Only Admins can get all users.',
  })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Only Admins allowed.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Admin can retrieve any user by ID.',
  })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER) // Admins & Benutzer können bearbeiten
  @ApiOperation({
    summary: 'Update user',
    description:
      'Admins can update any user, users can update their own profile.',
  })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: You can only update your own profile.',
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() payload: JWTPayloadTypes,
  ) {
    if (payload.role !== UserRole.ADMIN && payload.id !== id) {
      throw new Error('Access denied. You can only update your own profile.');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({
    summary: 'Delete user',
    description: 'Only Admins can delete a user.',
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Only Admins allowed.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
