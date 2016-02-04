# AngularJS Seed Project using TypeScript

This is a seed project template providing the structure and tools commonly necessary in all projects. It uses `Gulp` to automate the project, `Typescript` to write better JavaScript (static type checking, classes, interfaces, etc.), and `sass` to preprocess CSS.

The Project is already initialized with a sample page that uses [Random Users API](http://api.randomuser.me) to display sample users on screen. This can help one in getting started with the project easily.

## Tools prerequisite

Install following tools to get started

* [NodeJS](https://nodejs.org) - `Dobule click and install, ensure to add to environment variable`.
* [Bower](http://bower.io/) - `npm install -g bower`
* [Gulp](http://gulpjs.com/) - `npm install -g gulp`

## Installation

Open command prompt and run following commpand to get started

* `npm install` - this will install all the packages required (and defined in `gulpfile.js`) by gulp to function properly.
* Above command will also install all the `bower` dependencies, if already defined in `bower.json` file. For this project, dependencies are already lsited in `bower.json`.
* Once above process is completed, run `gulp` in console to automate rest of the process.
* `gulp` will also inject the custom `css` and `scripts` written by user, if written in correct folder. See `Using - src` for details.

## Using - src

`src` folder is where actual web page(or app) code is written. Current sturcture with functinonality is explained below -

* `index.html` - The main serveable file for the web page/app. 
* `app.module.ts` - This file contains the entry point for Angular app. All component modules will be called here.
* `app.scss` - This file is the parent `scss` file, which includes all the scss defined in vendor/external or components folders. No scss rules should be written here.
* `core` - This folder contains core functionality of apps requred by any module. It contains common moduels like `routes`, `service`, `factory`, `vendor css/ js`, and common css codes. Some folders have `.keep` file to ensure the commit. These files can be remvoed once the proper files are add to these folders.
* `components` - The project uses component based system. Each component represents the module of webpage/ webapp and relates to that portion only. All components have a `module` (component entry point), a `directive` (with controller), `html partial` (for directive to use), `scss` file (required for html partial).

## Using Bower

The seed project has angular packages required for any projects. IF you need to install any more packages, follow these steps to add bower dependencies.

* Add new bower dependency using `bower install <package_name> --save`.
* To remove already installed package use this command - `bower uninstall <package_name> --save`.
* After any change to bower package, restart the `gulp` command to insert these dependencies into the webapp.

## Using Gulp (& Node.js)

Gulp is task runner for JavaScript based on Node.js. It's a commandline tool which reads `gulpfile.js` for tasks and run them in console. Ordinarily, one doesn't need to modify `gulpfile.js` for projects, but if needed, it's simple Node.js code. Refer [Gulp Docs](https://github.com/gulpjs/gulp/tree/master/docs) for any help regarding modification of these files.

* `gulp <task_name>` it'll run the particular gulp task.
* `gulp` - it'll run the `default` task (task named default in gulpfile.js).
* Modify the variable `app` in gulpfile.js if your app folder structure is different.
* `npm install <package_name> --save-dev` - it'll install node module (generally Gulp modules) needed for new gulp tasks.
* `npm uninstall <package_name> --save-dev` - it'll remove the unused node module.

## Frequently Used Gulp Commands

* `gulp` - Runs the default task and watches for file changes. Needs to run while developing the app.
* `gulp bowerInsert` - Whenever a new bower dependency is added, just use this command to reflect changes in main app. Need to run paraller with default `gulp` command.
* `gulp build` - Used for creating production ready output.
* `gulp serve-prod` - Create a webserver for production environment.
