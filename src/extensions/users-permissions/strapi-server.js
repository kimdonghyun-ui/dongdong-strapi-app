// src/extensions/users-permissions/strapi-server.js
const jwt = require('jsonwebtoken');

module.exports = (plugin) => {
  const originalCallback = plugin.controllers.auth.callback;

  plugin.controllers.auth.callback = async (ctx) => {
    await originalCallback(ctx);

    const { jwt: accessToken, user } = ctx.body;

    // 토큰 만료 시간 .env에서 불러오기
    const accessTokenExpires = process.env.ACCESS_TOKEN_EXPIRES || '15m';
    const refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES || '7d';


    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
        { expiresIn: ms(refreshTokenExpires) / 1000 } // ms → 초
    );

    // Access Token 쿠키 (쿠키 수명도 env 적용)
    ctx.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ms(accessTokenExpires)
    });

    // Refresh Token 쿠키
    ctx.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ms(refreshTokenExpires)
    });

    ctx.body = { user };
  };

  return plugin;
};

// 쿠키 maxAge 계산용
function ms(str) {
  const match = str.match(/^(\d+)([smhd])$/);
  if (!match) return 0;
  const num = parseInt(match[1], 10);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return num * multipliers[unit];
}


