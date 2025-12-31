import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    })
    return this.signToken(user.id, user.email)
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new UnauthorizedException('Invalid credentials')

    return this.signToken(user.id, user.email)
  }

  private signToken(userId: number, email: string) {
    return {
      access_token: this.jwtService.sign({ sub: userId, email }),
    }
  }
}
