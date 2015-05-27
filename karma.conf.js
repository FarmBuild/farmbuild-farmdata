module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      //'src/specs/index.js'
      'bower_components/farmbuild-core/dist/farmbuild-core.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'node_modules/geojsonhint/geojsonhint.js',
      'src/index.js',
      'src/farmdata/index.src.js',
      'src/session/index.src.js',
      'src/validator/index.src.js',
      'src/validator/geo.src.js',
      'src/projection/crs-supported.conf.src.js',
      'src/paddocks/validator.src.js',
      'src/paddocks/index.src.js',
      'src/farmdata/blank.spec.js',
//      'src/farmdata/index.spec.js',
//      'src/session/index.spec.js',
      'src/validator/geojsonhint.spec.js',
      'src/validator/geo.spec.js',
//      'src/session/index-load.spec.js',
      'src/paddocks/validator.spec.js',
      'src/paddocks/index.spec.js',
//      'src/**/*.spec.js',
      {pattern: 'data/*.json'}
    ],

    autoWatch : true,

    frameworks: ['jasmine', 'fixture'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-fixture',
            'karma-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    preprocessors: {
      '**/*.html'   : ['html2js'],
      '**/*.json'   : ['html2js']
    }

  });
};
