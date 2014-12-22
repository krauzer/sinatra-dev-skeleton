'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var app = {
    src: "public/js/src/",
    dist: "publc/js/"
  };

  grunt.initConfig({
    app: app,

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      options: {
        browserifyOptions: {
          debug: true,
        transform: ['reactify','envify'] // ADD TRANSFORM OPTIONS
        }
      },
      dev: {
        options: {
          watch: true,
          keepAlive: true,
          browserifyOptions: {
            verbose: true,
            alias : ['react']
          }
        },
        src: ['<%=app.src%>application.js'],
        dest: '<%=app.dist%>application.js'
      },
      production: {
        options: {
          browserifyOptions: {
            debug: false
          }
        },
        src: ['<%= browserify.dev.src%>'],
        dest: '<%=app.dist%>application.js'
      }
    }
  });
};