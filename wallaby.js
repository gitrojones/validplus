module.exports = function (wallaby) {
    return {
        name: 'ValidPlus',

        autoDetect: true,

        hints: {
            ignoreCoverage: /ignore coverage/
        },

        files: [
            'src/**/*.ts'
        ],

        tests: [
            'test/**/*.test.ts'
        ],

        env: {
            type: 'node'
        },

        runMode: 'onsave'
    };
};