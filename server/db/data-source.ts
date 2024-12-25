import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
	migrations: [join(__dirname, '..', 'db', 'migrations', '*.{ts,js}')],
	// synchronize: true //only use this for dev db(data might get lost)
};
export const dataSource = new DataSource(dataSourceOptions);
