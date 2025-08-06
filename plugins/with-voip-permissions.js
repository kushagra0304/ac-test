const {
    withInfoPlist,
    withEntitlementsPlist,
} = require("@expo/config-plugins");

const withVoIPPermissions = (config) => {
    // Add permissions to Info.plist
    config = withInfoPlist(config, (config) => {
        // Ensure UIBackgroundModes is an array and add VoIP modes
        const existingModes = config.modResults.UIBackgroundModes || [];
        const requiredModes = ["audio", "fetch", "location", "remote-notification", "voip"];
        
        // Merge existing modes with required ones, avoiding duplicates
        const allModes = [...new Set([...existingModes, ...requiredModes])];
        config.modResults.UIBackgroundModes = allModes;

        // Add usage descriptions
        config.modResults.NSMicrophoneUsageDescription =
            config.modResults.NSMicrophoneUsageDescription ||
            "This app needs access to your microphone for audio calls.";

        config.modResults.NSLocationWhenInUseUsageDescription =
            config.modResults.NSLocationWhenInUseUsageDescription ||
            "This app needs location access for location-based features.";
        
        config.modResults.NSLocationAlwaysAndWhenInUseUsageDescription =
            config.modResults.NSLocationAlwaysAndWhenInUseUsageDescription ||
            "This app needs location access for background location features.";

        // Remove VoIP entitlement from Info.plist if it exists (wrong place)
        if (config.modResults["com.apple.developer.pushkit.unrestricted-voip"]) {
            delete config.modResults["com.apple.developer.pushkit.unrestricted-voip"];
            console.warn("Removed VoIP entitlement from Info.plist - it belongs in entitlements!");
        }

        console.log("✅ Info.plist configured with background modes:", allModes);
        return config;
    });

    // Add VoIP entitlement to entitlements file
    config = withEntitlementsPlist(config, (config) => {
        // Ensure modResults exists and is an object
        if (!config.modResults) {
            config.modResults = {};
        }

        // Add the VoIP entitlement
        config.modResults["com.apple.developer.pushkit.unrestricted-voip"] = true;
        
        console.log("✅ VoIP entitlement added to entitlements file");
        console.log("Current entitlements:", Object.keys(config.modResults));
        
        return config;
    });

    return config;
};

module.exports = withVoIPPermissions;