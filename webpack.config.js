const path = require('path');
const PUBLIC_DIR = path.resolve(__dirname, 'public/js');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: SRC_DIR + '/index.js',
    output: {
        path: PUBLIC_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: SRC_DIR,
                query: {
                    presets: [
                        'es2015',
                        'react',
                        'stage-0'
                    ]
                }
            }
        ]
    }
};
