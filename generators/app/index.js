'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Your Project is genereated By ${chalk.red('Node MVC')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'dbName',
        message: 'DB Name:',
        default: 'node-mc'
      },
      {
        type: 'input',
        name: 'serviceName',
        message: 'Service Name:',
        default: 'user'
      },
      {
        type: 'confirm',
        name: 'hasModel',
        message: 'do you want a model?',
        default: false
      },
      {
        when: function (response) {
          return response.hasModel
        },
        type: 'input',
        name: 'modelName',
        message: 'Model Name:',
        default: 'user'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    const { serviceName, dbName, hasModel, modelName } = this.props;

    /** Copy All except files startsWith (_)
     * 
     * 
     */
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.props
    )


    /** @Models
     * 
     */
    if (hasModel && modelName) {
      this.props['modelNameCapitalized'] = `${modelName.charAt(0).toUpperCase()}${modelName.substr(1)}`;
      this.fs.copyTpl(
        this.templatePath('app/models/_model.js'),
        this.destinationPath(`app/models/${modelName}.js`),
        this.props
      );
    }

    /** @Controller
     * 
     */
    this.fs.copyTpl(
      this.templatePath('app/controllers/_ctrl.js'),
      this.destinationPath(`app/controllers/${serviceName}.js`),
      this.props
    )


    /** @Services
     * 
     */

    this.fs.copyTpl(
      this.templatePath('app/services/_service.js'),
      this.destinationPath(`app/services/${serviceName}.js`),
      this.props
    )

    /** @Routes
     * 
     */

    this.fs.copyTpl(
      this.templatePath('routes/_route.js'),
      this.destinationPath(`routes/${serviceName}.js`),
      this.props
    )
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
