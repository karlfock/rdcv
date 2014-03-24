'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: [
                'gruntfile.js',
                'app/**/*.js',
                'node/**/*.js',
                'test/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            nodeRun: {
                files: [
                    'index.js',
                    'node/**/*.js'
                ],
                tasks: ['nodemon:run']
            },

            nodeDebug: {
                files: [
                    'index.js',
                    'node/**/*.js'
                ],
                tasks: ['nodemon:debug']
            }
        },

        nodemon: {
            run: {
                script: 'index.js',
            },
            debug: {
                script: 'index.js',
                options: {
                    nodeArgs: ['--debug-brk'] // possible to debug with node-inspector
                }
            }
        }
        // nodemon: {
        //     dev: {
        //         script: 'index.js'
        //     }
        // }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    // currently have to edit some node file to start nodemon...
    grunt.registerTask('run', ['watch:nodeRun']);
    grunt.registerTask('debug', ['watch:nodeDebug']);

};