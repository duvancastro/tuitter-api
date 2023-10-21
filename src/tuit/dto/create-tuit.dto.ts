import { IsObject, IsString} from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateTuitDto {
  @IsString()
  readonly message: string;
  @IsObject()
  readonly user: Partial<User>;
}
