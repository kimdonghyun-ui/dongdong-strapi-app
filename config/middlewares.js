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
        env('PUBLIC_URL'), // Cloudtype 배포 주소
        // `${env('PUBLIC_URL')}/documentation`, // Cloudtype(Swagger) 배포 주소
        'http://localhost:3000', // 필요하면 로컬도 유지
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
