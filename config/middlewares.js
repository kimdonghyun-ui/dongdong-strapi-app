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
        'http://localhost:3000', // 필요하면 로컬도 유지
        'https://my-budget-app-steel.vercel.app', // [나만의 가계부] 
        'https://my-word-app.vercel.app', // [영어 단어 학습]
        'https://my-daylio-app.vercel.app', // [나만의 감정 기록]
        'https://my-todos-app-alpha.vercel.app', // [간단한 일정등록]
        'https://my-chat-app-lemon.vercel.app', // [간단한 채팅]
        'https://my-food-app-kappa.vercel.app', // [맛집 찾기 앱]
        'https://my-instagram-app-chi.vercel.app', // [인스타그램 클론 앱]
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
