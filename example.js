require('./index')
(
    {
        port: 3000,
        handler_root: './handlers',
        middleware_root: './middlewares',
        app_config:
            {
                'trust proxy': true
            }
    }
);