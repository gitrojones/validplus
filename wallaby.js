module.exports = function (wallaby) {
    return {
        name: 'ValidPlus',

        files: [
            'src/**/*.ts'
        ],

        tests: [
            'test/**/*.test.ts'
        ],

        env: {
            type: 'node'
        },

        compilers: {
            "**/*.js": wallaby.compilers.babel(),
            "**/*.ts?(x)": wallaby.compilers.typeScript({
                isolatedModules: true,
                typescript: require('ttypescript')
            }),
        },

        testFramework: 'jest',

        setup(wallaby) {
            const config = require('./package.json').jest;
            Object.keys(config.moduleNameMapper).forEach(k =>
              (config.moduleNameMapper[k] = config.moduleNameMapper[k]
                .replace('<rootDir>', wallaby.localProjectDir)))
            wallaby.testFramework.configure(config);
        }
    };
};