module.exports = function (wallaby) {
    return {
        name: 'ValidPlus',

        autoDetect: true,

        files: [
            'src/**/*.ts'
        ],

        tests: [
            'test/**/*.test.ts'
        ],

        env: {
            type: 'node'
        }
    };
};