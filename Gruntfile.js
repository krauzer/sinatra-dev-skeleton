'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var app = {
    src: "public/js/src/",
    dist: "publc/js/"
  };

  grunt.initConfig({
    app: app,

    pkg: grunt.file.readJSON('package.json')

  });
};