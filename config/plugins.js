// config/plugins.js
module.exports = ({ env }) => ({
    'users-permissions': {
        config: {
            jwt: {
                expiresIn: env('ACCESS_TOKEN_EXPIRES', '15m'), // 기본값 15분
            },
        },
    },

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

});