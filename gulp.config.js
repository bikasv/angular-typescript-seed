/*global module*/

module.exports = function() {
    var config = {
        root: 'src',
        vendor: 'src/core/vendor/**/*.js',
        images: 'src/images/**/*',
        fonts: 'src/fonts/**/*',
        dest: 'out',
        destImg: 'out/images',
        destLib: 'out/lib',
        destFont: 'out/fonts',
        destDist: 'out/dist',
        scripts: 'app/scripts',
        scss: 'app/sass',
        styles: 'app/styles',
        injectFiles: [
            'out/lib/**/angular.js',
            'out/lib/**/*',
            'out/dist/main.min.js',
            'out/dist/templates.js',
            'out/dist/app.min.css'
        ],
        scriptSource: [
            '!' + 'src/**/*-bak.ts',
            'src/**/*.module.ts',
            'src/**/*.config.ts',
            'src/**/*.service.ts',
            'src/**/*.factory.ts',
            'src/**/*.directive.ts',
            'src/**/*.controller.ts',
            'src/**/*.ts'
        ]
    };
    
    return config;
};