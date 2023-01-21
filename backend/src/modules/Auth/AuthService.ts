import { Users } from './entities/usersEntity';
import { SignUpBodyDto } from './dto/UserBodyDto';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
  genToken(user: SignUpBodyDto) {
    const { id, fullName, gender, dateOfBirth, email } = user;
    return jwt.sign(
      {
        id,
        fullName,
        gender,
        dateOfBirth,
        email,
      },
      process.env.SECRET_JWT,
      { expiresIn: '2h' }
    );
  }
  async findById(id): Promise<Users> {
    return await Users.findOne({ where: { id } });
  }
  async findByEmail(email): Promise<Users> {
    return await Users.findOne({ where: { email } });
  }
  async create(data: SignUpBodyDto) {
    return await Users.create({
      ...data,
      password: await bcryptjs.hash(data.password, 10),
    });
  }
}

export default AuthService;
