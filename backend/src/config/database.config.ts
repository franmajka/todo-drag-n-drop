import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

import { Todo } from 'src/database/entities/Todo';
import { satisfiesRecord } from 'src/common/utils';

export const databaseConfig = registerAs('database', () =>
  satisfiesRecord<DataSourceOptions>()({
    todo: {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: !(process.env.NODE_ENV === 'production'),
      logging: !(process.env.NODE_ENV === 'production'),
      entities: [Todo],
      migrations: ['dist/database/migrations/*.js'],
    },
  }),
);
