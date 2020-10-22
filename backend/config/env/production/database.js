module.exports = ({ env }) => ({
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "mongoose",
      "settings": {
        "client": "mongo",
        "uri": `${process.env.DATABASE_URI || ''}`,
        "host": `${process.env.DATABASE_HOST || 'localhost'}`,
        "port": `${process.env.DATABASE_PORT || 27017}`,
        "database": `${process.env.DATABASE_NAME || 'production'}`,
        "username": `${process.env.DATABASE_USERNAME || ''}`,
        "password": `${process.env.DATABASE_PASSWORD || ''}`
      },
      "options": {
        "authenticationDatabase": `${process.env.DATABASE_NAME || 'production'}`,
        "ssl": false
      }
    }
  }
});
