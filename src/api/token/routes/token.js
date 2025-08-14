module.exports = {
    routes: [
      {
        method: "POST",
        path: "/auth/refresh",
        handler: "token.refresh",
        config: {
          auth: false, // 이 API는 토큰이 만료된 상태에서 호출될 수 있으므로 인증 비활성화
        },
      },
    ],
  };
  