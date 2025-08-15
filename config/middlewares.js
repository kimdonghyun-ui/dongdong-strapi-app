module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
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
