// 配置pm2
module.exports = {
  apps: [
    {
      name: "request",
      script: "./server/index.mjs",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: "3004",
        HOST: "0.0.0.0"
      }
    }
  ]
};
