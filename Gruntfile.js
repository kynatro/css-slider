module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 8001,
          hostname: 'localhost',
          livereload: true
        }
      }
    },
    jasmine: {
      tests: {
        src: 'src/**/*.js',
        options: {
          specs: 'spec/*-spec.js',
          helpers: 'lib/*.js',
          vendor: [
            'lib/jquery-1.11.1.js',
            'lib/jasmine-jquery.js'
          ]
        }
      }
    },
    watch : {
      files : ['src/*.js', 'spec/*.js', 'Gruntfile.js'],
      // tasks: ['jasmine'],
      options: {
        livereload: true // then live reload
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/*.js',
        'spec/**/*.js',
      ]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'jshint', 'watch']);
};