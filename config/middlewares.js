module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',

  // cloudinary 이미지 업로드 설정
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
        },
      },
    },
  },

  // cors 설정
  {
    name: 'strapi::cors',
    config: {
      // enabled: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      origin: [
        // env('PUBLIC_URL'), // Cloudtype 배포 주소
        // `${env('PUBLIC_URL')}/documentation`, // Cloudtype(Swagger) 배포 주소
        'https://dongdong-ui.com',
        'https://www.dongdong-ui.com',
        'https://api.dongdong-ui.com', // [Strapi API 도메인]
        'http://localhost:3000', // [로컬 도메인]
        'https://my-budget-app.dongdong-ui.com', // [나만의 가계부] 
        'https://my-word-app.dongdong-ui.com', // [영어 단어 학습]
        'https://my-daylio-app.dongdong-ui.com', // [나만의 감정 기록]
        'https://my-todos-app.dongdong-ui.com', // [간단한 일정등록]
        'https://my-chat-app.dongdong-ui.com', // [간단한 채팅]
        'https://my-food-app.dongdong-ui.com', // [맛집 찾기 앱]
        'https://my-instagram-app.dongdong-ui.com', // [인스타그램 클론 앱]
      ],
    },
  },
  
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
