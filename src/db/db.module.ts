import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schema/project.schema';
import { UserSchema } from './schema/user.schema';

const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchema,
    collection: 'user',
  },
  {
    name: 'PROJECT_MODEL',
    schema: ProjectSchema,
    collection: 'project',
  },
]);

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest_base', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    MONGO_MODELS,
  ],
  exports: [MONGO_MODELS],
})
export class DbModule {}
