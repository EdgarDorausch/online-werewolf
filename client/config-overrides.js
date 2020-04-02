const {alias, configPaths} = require('react-app-rewire-alias');

module.exports = function override(config) {

  // alias(configPaths())(config)

  // or with spread and custom config file
  alias({
    ...configPaths('./tsconfig.paths.json')
  })(config)

  return config
}