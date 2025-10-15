const path = require('path')
const CracolessPlugin = require('craco-less') //新增

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  plugins: [{ plugin: CracolessPlugin }], //新增
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
