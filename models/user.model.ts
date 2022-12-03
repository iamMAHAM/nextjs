import { Schema, model, models, Model } from 'mongoose';
import validator from 'validator';
import { comparePassword, hash } from '../functions/hash';
import { IUser, IUserMethods } from '../types/user.model';

type models = Model<
  IUser,
  {},
  IUserMethods,
  {},
  Schema<IUser, {}, IUserMethods, {}, {}, {}, 'type', IUser>
>;

const uSchema = new Schema<IUser, {}, IUserMethods>(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, 'missing username'],
      minLength: [4, 'Minimum 4 caracteres.'],
      maxLength: [16, 'Maximum 16 caracteres.'],
      validate: {
        validator: (v: string) => validator.isAlpha(v, 'fr-FR'),
        message: 'Only letter are allowed',
      },
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: 'invalid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      validate: {
        validator: (v: string) => validator.isStrongPassword(v),
        message: 'password is not strong',
      },
    },
    birthday: {
      type: Schema.Types.Date,
      required: [true, 'missing birthday date'],
      min: ['1900-01-01', 'invalid date'],
      max: ['2005-12-31', '18 years minimum'],
    },
    emailVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    avatar: {
      type: String,
      required: false,
      default:
        'https://img2.freepng.fr/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg',
    },
    role: {
      type: [String],
      required: true,
      default: ['user'],
    },
  },
  {
    timestamps: true,
  }
);

uSchema.pre('save', async function (next: Function) {
  try {
    const user = this;
    if (!user.isModified('password')) return next();
    this.password = await hash(this.password!);
    return next();
  } catch (e: unknown) {
    return next(e);
  }
});

uSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await comparePassword(password, this.password);
};

uSchema.methods.hasRole = function (role: string) {
  return this.role === role;
};

const User: models = models.User ? models.User : model('User', uSchema);
export default User;
