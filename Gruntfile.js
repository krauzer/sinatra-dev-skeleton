'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var app = {
    src: "public/js/src/",
    dist: "publc/js/",
    cssSrc: "public/css/src",
    cssDist: "public/css/"
  };

  grunt.initConfig({
    app: app,

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dev: 'tmp'
    },

    concat: {
      options: {
        sourceMap: true
      },
      styles: {
        files: { 'tmp/styles/application.css' : ['<%= app.cssSrc %>*.css']  }
       }
     },

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

    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions']
      },
      dist: {
        src: '<%=app.cssSrc%>*.css',
        dest: 'tmp/styles/'
      }
    },

    cssmin: {
      minify: {
        files : {
          '<%=app.cssDist%>.application.min.css' : ['tmp/styles/*.css']
        }
      }
    }

  });

grunt.registerTask('develop', [
    'clean:dev',
    'concat:styles'
  ]);

};