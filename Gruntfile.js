'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var app = {
    codeSrc: "public/js/src/",
    codeDist: "dist/js/",
    stylesSrc: "public/css/src/",
    stylesDist: "dist/css/",
    temp: "tmp",
    codeTemp: "tmp/js/",
    stylesTemp: "tmp/styles/"
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

    uglify: {
      minify: {
        files: {
          '<%= app.codeDist%>.application.min.js': ['<%= app.codeDist%>.application.js']
        }
      }
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

    cssmin: {
      minify: {
        files : {
          '<%=app.cssDist%>.application.min.css' : ['<%=app.cssSrc%>*.css']
        }
      }
    },

    watch: {
      styles: {
        files: ['<%= app.stylesSrc %>*.css'],
        tasks: ['concat:styles']
      }
    }

  });

grunt.registerTask('develop', [
    'clean:dev',
    'concat:styles'
  ]);

};