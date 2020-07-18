import defaultConfig, { Configuration } from './config.default';

export default (): Configuration =>
  Object.assign(defaultConfig, {
    port: 3000,
    sequelize: {
      dialect: 'mysql',
      host: '47.116.3.37',
      port: 3306,
      username: 'root',
      password: 'xt87464579',
      database: 'test',
    },
  });
