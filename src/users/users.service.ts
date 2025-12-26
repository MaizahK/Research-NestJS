import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersService {
    private users: User[] = [];
    private idCounter = 1;

    create(user: Omit<User, 'id'>): User {
        const newUser = { id: this.idCounter++, ...user };
        this.users.push(newUser);
        return newUser;
    }

    findAll(): User[] {
        return this.users;
    }

    findOne(id: number): User {
        return this.users.find(u => u.id === id);
    }

    update(id: number, data: Partial<User>): User {
        const user = this.findOne(id);
        Object.assign(user, data);
        return user;
    }

    remove(id: number): void {
        this.users = this.users.filter(u => u.id !== id);
    }
}
