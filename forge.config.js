const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "coelhomarcus",
                    name: "dongo",
                },
                prerelease: false,
                draft: false,
            },
        },
    ],
    packagerConfig: {
        asar: true,
        ignore: ["^/src", "^/electron", "^/node_modules", "^/\\.git", "^/\\.vscode"],
        extraResource: ["./dist", "./assets"],
        icon: "./assets/icon",
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "dongo",
                authors: "Marcus Coelho",
                description: "API client simples feito com Electron e React",
                exe: "dongo.exe",
                icon: "./assets/icon.ico",
            },
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["win32"],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {},
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {},
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {},
        },
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
};
