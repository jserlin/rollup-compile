const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const version = require('../package.json').version
const babel = require('rollup-plugin-babel')
const uglify = require('uglify-js')
const zlib = require('zlib')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

function resolve(p) {
  return path.resolve(__dirname, '../', p)
}

const banner =
  '/*!\n' +
  ' * pika v' + version + '\n' +
  ' * (c) 2018-' + new Date().getFullYear() + ' lyf-track\n' +
  ' */'
const builds = [{
  input: resolve('src/index.js'),
  output: {
    file: resolve('dist/pika.js'),
    format: 'umd',
    name: 'pika',
    banner: banner
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
},{
    input: resolve('src/index.js'),
    output: {
      file: resolve('dist/pika.esm.js'),
      format: 'es',
      name: 'pika',
      banner: banner
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ],
  },{
    input: resolve('src/index.js'),
    output: {
      file: resolve('dist/pika.min.js'),
      format: 'umd',
      name: 'pika',
      banner: banner
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ],
  }
]

function build(builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

async function buildEntry(config) {
  const isProd = /min\.js$/.test(config.output.file)
  const bundle = await rollup.rollup(config);
  const { code, map } = await bundle.generate(config);
    if (isProd) {
      var minified = (config.output.banner ? config.output.banner + '\n' : '') + uglify.minify(code, {
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code
      return write(config.output.file, minified, true)
    } else {
      return write(config.output.file, code)
    }
}

function write(dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report(extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, (err) => {
      if (err) {
        return reject(err)
      }
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function logError(e) {
  console.log(e)
}

build(builds)