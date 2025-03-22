import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException(
        'Ein Benutzer mit dieser E-Mail existiert bereits',
      );
    }
    return await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
  }

  async findAll() {
    const users = await this.userRepository.find();
    if (!users) {
      return 'No Users vorhanden';
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User mit ID ${id} nicht gefunden`);
    }
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    return (await this.userRepository.findOne({ where: { email } })) ?? null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Existenzprüfung

    // Prüfen, ob eine neue E-Mail angegeben wurde und sie nicht der alten entspricht
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);

      // Falls die E-Mail bereits von einem anderen Benutzer genutzt wird
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Diese E-Mail ist bereits vergeben.');
      }
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
