module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      files: ['./public/js/*.js', './app/*.js'],
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in data
      build: ['Gruntfile.js', './public/js/*.js', './app/*.js']
    },
    sass: {
      dist: {
        files: {
          './public/styles/css/minWidth_981.css': './public/styles/sass/minWidth_981.scss',
          './public/styles/css/minWidth_300.css': './public/styles/sass/minWidth_300.scss',
          './public/styles/css/minWidth_600.css': './public/styles/sass/minWidth_600.scss',
          './public/styles/css/minWidth_768.css': './public/styles/sass/minWidth_768.scss',
          './public/styles/css/animations.css': './public/styles/sass/animations.scss'
          
        }
      }
    },
    // uglify: {
    //   options:{
    //     banner:'/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   build:{
    //     files:{
    //       '../dist/js/app.min.js': ['../data/*.js','../data/app/*.js','../data/js/controllers/*.js','../data/js/directives/*.js','../data/js/service/*.js']
    //     }
    //   }
      
    // },
      // configure cssmin to minify css files ------------------------------------
    // cssmin: {
    //   options: {
    //     banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
    //   },
    //   build: {
    //     files: {
    //       '../dist/css/style.min.css': ['../styles/css/main.css','../styles/css/styles_300.css','../styles/css/styles_600.css','../styles/css/styles_768.css']
    //     }
    //   }
    // },
    watch: {
      app: {
        files: ['./public/js/*.js', './app/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['./public/styles/sass/*.scss'],
        tasks: ['sass']
      }
      
    }
  
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch','uglify','imagemin']);
};