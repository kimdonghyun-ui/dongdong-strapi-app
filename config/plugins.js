// config/plugins.js
module.exports = ({ env }) => ({
    // 유저 권한 설정
    'users-permissions': {
        config: {
            jwt: {
                expiresIn: env('ACCESS_TOKEN_EXPIRES', '15m'), // 기본값 15분
            },
        },
    },

    // 스웨거 설정
    documentation: {
        enabled: true,
        config: {
          servers: [
            {
                url: `${env('PUBLIC_URL')}/api`,
                description: 'Cloudtype Deployment',
            },
          ],
        },
    },

    // 이미지 업로드 설정
    upload: {
        config: {
          provider: 'cloudinary',
          providerOptions: {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
          },
          actionOptions: {
            upload: {},
            delete: {},
          },
        },
    },

    

});