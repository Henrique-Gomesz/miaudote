const config = {
  mongodb: {
    url: process.env.MONGO_URL,
    databaseName: 'miaudote',
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'migrations-changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
