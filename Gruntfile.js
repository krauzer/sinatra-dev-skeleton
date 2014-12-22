'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var app = {
    src: "public/js/src/",
    dist: "publc/js/",
    cssSrc: "public/css/src",
    cssDist: "public/css/"
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
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      src: [
            'Gruntfile.js',
           '<%= app.src %>/*.js'
      ]
    },

    uglify: {
      minify: {
        files: {
          '<%= app.dist%>.application.min.js': ['<%= app.dist%>.application.min.js']
        }
      }
    },

    cssmin: {
      minify: {
        files : {
          '<%=app.cssDist%>.application.min.css' : ['<%=app.cssSrc%>*.css']
        }
      }
    }

  });
};