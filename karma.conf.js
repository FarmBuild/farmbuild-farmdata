module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      //'src/specs/index.js'
      'bower_components/farmbuild-core/dist/farmbuild-core.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/index.js',
      'src/farmdata/index.src.js',
      'src/farmdata/session.src.js',
      'src/farmdata/validator.src.js',
      'src/farmdata/index.spec.js',
      'src/farmdata/session.spec.js',
      'src/farmdata/validator.spec.js'
//      'src/**/*.spec.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
