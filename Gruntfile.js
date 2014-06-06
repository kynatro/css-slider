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
    watch : {
      files : ['src/*.js', 'spec/*.js', 'Gruntfile.js'],
      tasks: ['jshint'],
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
        // 'src/*.js',
        'spec/**/*.js',
      ]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'jshint', 'watch']);
};