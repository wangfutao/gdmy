module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  ignore: 'src,node_modules',
  makers: [
    {
      name: '@electron-forge/maker-wix',
      config: {
        language: 1033,
        manufacturer: 'wangft'
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO'
      }
    }
  ],
};
