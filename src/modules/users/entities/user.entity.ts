import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../common/utils/enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Eindeutige ID des Benutzers' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'E-Mail-Adresse des Benutzers',
    example: 'user@example.com',
  })
  email: string;

  @Column()
  @ApiProperty({ description: 'Gehashtes Passwort' })
  password: string;

  @Column()
  @ApiProperty({ description: 'Vorname des Benutzers', example: 'John' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Nachname des Benutzers', example: 'Doe' })
  last_name: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Profilbild-URL',
    example: 'https://example.com/profile.jpg',
  })
  profile_image?: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Kurzbeschreibung des Benutzers',
    example: 'Full-Stack Developer',
  })
  bio?: string;

  @Column({ type: 'enum', enum: UserRole, default: 'user' })
  @ApiProperty({
    description: 'Systemrolle des Benutzers',
    enum: UserRole,
  })
  system_role: UserRole;

  @CreateDateColumn()
  @ApiProperty({ description: 'Erstellungsdatum' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Aktualisierungsdatum' })
  updated_at: Date;
}
