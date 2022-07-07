import 'dotenv/config'

const ormConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  migrationsTableName: 'migrations',
  entities: [
    './dist/**/*.entity{.ts,.js}'
  ],
  seeds: ['./dist/src/database/seeders/**/*.js'],
  migrations: ['./dist/src/database/migrations/*{.ts,.js}'],
}

export default ormConfig;