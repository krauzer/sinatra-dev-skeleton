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
    stylesDist: "dist/styles/",
    layoutSrc: "app/views/",
    viewsSrc: "app/views/",
    viewsDist: "dist/views/"
  };

  grunt.initConfig({
    app: app,

    pkg: grunt.file.readJSON('package.json'),

    env : {
      dev: {
        NODE_ENV : 'development',
        DEST: '<%= app.codeTemp %>',
      },
      build: {
        NODE_ENV : 'production',
        DEST: '<%= app.dist %>',
      }
    },

    clean: {
      dev: '<%= app.temp %>',
      build: {
        src: ['<%= app.temp %>', '<%= app.dist %>']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: '<%= app.viewsSrc %>',
        src: '{,*/}*.erb',
        dest: '<%= app.viewsDist %>'
      }
    },

    concat: {
      options: {
        sourceMap: true
      },
      styles: {
        files: { '<%= app.stylesTemp %>application.css' : ['<%= app.stylesSrc %>*.css']  }
       }
     },

     filerev: {
      build: {
          src: [
            '<%= app.codeDist %>*.js',
            '<%= app.stylesDist %>*.css'
          ]
      }
     },

     useminPrepare: {
      options: {
        dest: '<%= app.dist %>',
        staging: '<%= app.temp %>',
        flow: {
          layout: {
            steps: {
              js: ['uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      },
      layout: "<%= app.layoutSrc %>layout.erb"
     },

     usemin: {
      options: {
        assetsDirs:
          ['<%= app.dist %>']
      },
      html: ['<%= app.viewsDist %>{,*/}*.erb']
     },

    browserify: {
      options: {
        browserifyOptions: {
          debug: true,
        transform: ['reactify'] // ADD TRANSFORM OPTIONS
        }
      },
      dev: {
        options: {
          watch: true,
          keepAlive: true,
          browserifyOptions: {
            verbose: true
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
        dest: '<%=app.codeTemp%>application.js'
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
    'env:dev',
    'concurrent:dev'
  ]);

grunt.registerTask('build', [
    'clean:build',
    'useminPrepare',
    'concat:styles',
    'cssmin:generated',
    'browserify:production',
    'uglify',
    'copy:build',
    'filerev:build',
    'usemin',
    'env:build'
  ]);

};