interface DataBase {
  dialect: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface Configuration {
  port: number;
  sequelize: DataBase;
}

export default (): Configuration => ({
  port: 3000,
  sequelize: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3304,
    username: 'root',
    password: 'xt87464579',
    database: 'test',
  },
});
