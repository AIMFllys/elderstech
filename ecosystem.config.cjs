module.exports = {
  apps: [{
    name: 'elderstech',
    script: '/www/wwwroot/elderstech.husteread.com/node_modules/.bin/next',
    args: 'start',
    cwd: '/www/wwwroot/elderstech.husteread.com',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    max_memory_restart: '512M',
    error_file: '/root/.pm2/logs/elderstech-error.log',
    out_file: '/root/.pm2/logs/elderstech-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};
