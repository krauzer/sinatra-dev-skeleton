'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var app = {
    temp: "tmp",
    dist: "dist",
    codeSrc: "public/js/src/",
    codeTemp: "tmp/js/",
    codeDist: "dist/js/",
    stylesSrc: "public/css/src/",
    stylesTemp: "tmp/styles/",
    stylesDist: "dist/css/",
    layoutSrc: "app/views/"
  };

  grunt.initConfig({
    app: app,

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dev: '<%= app.temp %>'
    },

    concat: {
      options: {
        sourceMap: true
      },
      styles: {
        files: { '<%= app.stylesTemp %>application.css' : ['<%= app.stylesSrc %>*.css']  }
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
        src: ['<%=app.codeSrc%>application.js'],
        dest: '<%=app.codeTemp%>application.js'
      },
      production: {
        options: {
          browserifyOptions: {
            debug: false
          }
        },
        src: ['<%= browserify.dev.src%>'],
        dest: '<%=app.codeDist%>application.js'
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

    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions'],
        map: true
      },
      dev: {
        src: '<%=app.stylesTemp%>application.css'
      }
    },

    watch: {
      styles: {
        files: ['<%= app.stylesSrc %>*.css'],
        tasks: ['concat:styles']
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: [
      'browserify:dev',
      'watch:styles'
      ]
    }

  });

grunt.registerTask('develop', [
    'clean:dev',
    'concat:styles',
    'concurrent:dev'
  ]);

};