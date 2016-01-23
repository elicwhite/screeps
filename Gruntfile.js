require('dotenv').config();

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        clean: ["dist"],

        screeps: {
            options: {
                email: process.env.EMAIL,
                password: process.env.PASSWORD,
                branch: 'local',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}
