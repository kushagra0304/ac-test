const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withResolveAudioswitchConflict(config) {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      // Add resolution strategy to force use of official Twilio audioswitch
      const resolutionStrategy = `
    configurations.all {
        resolutionStrategy {
            force 'com.twilio:audioswitch:1.2.2'
        }
        exclude group: 'com.github.davidliu', module: 'audioswitch'
    }`;

      config.modResults.contents = config.modResults.contents.replace(
        /dependencies\s*\{/,
        `dependencies {${resolutionStrategy}`
      );
    }
    return config;
  });
};