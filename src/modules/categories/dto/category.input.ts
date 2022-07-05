import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field(() => String)
  name: string;
}
