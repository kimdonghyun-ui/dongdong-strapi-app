// src/extensions/users-permissions/strapi-server.js
const jwt = require('jsonwebtoken');

module.exports = (plugin) => {
  const originalCallback = plugin.controllers.auth.callback;

  plugin.controllers.auth.callback = async (ctx) => {
    const origin = ctx.request.header.origin || "";

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

    const url = new URL(origin);
    const cookieDomain = url.hostname; // 예: "my-budget-app.dongdong-ui.com"
    
    console.log('cookieDomain', cookieDomain);

    // Access Token 쿠키 (쿠키 수명도 env 적용)
    ctx.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: ms(accessTokenExpires) + ms("5m"), // 억세스토큰 만료시간 보다 쿠키 만료시간은 길어야 jwt 리플래시 토큰 통해 억세스 토큰 재발급 로직이 유지되기때문에 추가 시간 준것임
      domain: process.env.NODE_ENV === 'production' ? cookieDomain : undefined,
    });

    // Refresh Token 쿠키
    ctx.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: ms(refreshTokenExpires),
      domain: process.env.NODE_ENV === 'production' ? cookieDomain : undefined,
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


