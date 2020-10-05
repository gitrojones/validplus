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
            "**/*.ts?(x)": wallaby.compilers.typeScript(),
        },

        testFramework: 'jest',

        setup(wallaby) {
            const config = require('./package.json').jest;
            ['moduleNameMapper', 'setupFiles'].forEach((key) =>
              Object.keys(config[key]).forEach(k =>
                (config[key][k] = config[key][k]
                  .replace('<rootDir>', wallaby.localProjectDir))));
            wallaby.testFramework.configure(config);
        }
    };
};