"use strict";

const jwt = require("jsonwebtoken");

function ms(str) {
  const match = str.match(/^(\d+)([smhd])$/);
  if (!match) return 0;
  const num = parseInt(match[1], 10);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return num * multipliers[unit];
}

module.exports = {
  async refresh(ctx) {
    const origin = ctx.request.header.origin || "";

    try {
      const url = new URL(origin);
      const cookieDomain = url.hostname; // 예: "my-budget-app.dongdong-ui.com"
     


      const refreshToken = ctx.cookies.get("refreshToken");

      if (!refreshToken) {
        return ctx.unauthorized("Refresh token not found");
      }

      // Refresh Token 검증
      let decoded;
      try {
        decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET || "refresh_secret"
        );
      } catch (err) {
        return ctx.unauthorized("Invalid or expired refresh token");
      }

      const user = await strapi.db.query("plugin::users-permissions.user").findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        return ctx.unauthorized("User not found");
      }

      // Access Token 재발급
      const accessTokenExpires = process.env.ACCESS_TOKEN_EXPIRES || "15m";
      const accessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: ms(accessTokenExpires) / 1000 } // ms → 초
      );

      ctx.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: ms(accessTokenExpires) + ms("5m"), // 억세스토큰 만료시간 보다 쿠키 만료시간은 길어야 jwt 리플래시 토큰 통해 억세스 토큰 재발급 로직이 유지되기때문에 추가 시간 준것임
        domain: process.env.NODE_ENV === 'production' ? cookieDomain : undefined,
      });

      return ctx.send({ message: "Access token refreshed" });
    } catch (error) {
      console.error(error);
      return ctx.internalServerError("Something went wrong");
    }
  },


  async logout(ctx) {
    const origin = ctx.request.header.origin || "";
    try {
      const url = new URL(origin);
      const cookieDomain = url.hostname; // 예: "my-budget-app.dongdong-ui.com"
      
      // 쿠키 삭제 (maxAge 0)
      ctx.cookies.set("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 0,
        domain: process.env.NODE_ENV === 'production' ? cookieDomain : undefined,
      });
      ctx.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 0,
        domain: process.env.NODE_ENV === 'production' ? cookieDomain : undefined,
      });

      return ctx.send({ message: "Logged out successfully" });
    } catch (error) {
      console.error(error);
      return ctx.internalServerError("Something went wrong during logout");
    }
  },








};
