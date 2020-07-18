import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
// import configuration from '../config/config.default'
// import { LoggerMiddleware, Logger2Middleware, logger } from './logger.middleware'
import { AuthModule } from './auth/auth.module';

console.log(555, process.env.NODE_ENV)
const configuration = require(`../config/config.${process.env.NODE_ENV ||
  'default'}`).default;

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...configuration().sequelize,
      autoLoadModels: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
  ],
  // controllers: [AppController],
  providers: [
    // AppService,
    // {
    //   provide: 'CONNECTION',
    //   useValue: {
    //     getHello: '23'
    //   },
    //   useFactory(): number {
    //     console.log(888);
    //     return 1;
    //   },
    //   useClass: ConfigService
    // },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(logger).forRoutes({ path: '', method: RequestMethod.GET });
  // }
}
