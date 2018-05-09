import babel from 'rollup-plugin-babel'
import glob from 'tiny-glob/sync'
import pkg from './package.json'

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return id => pattern.test(id);
}

export default {
  experimentalCodeSplitting: true,
  input: glob('src/*.js'),
  output: [
    { dir: 'lib', format: 'cjs' },
    { dir: 'es', format: 'es' },
  ],
  external: makeExternalPredicate([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]),
  plugins: [
    babel({ plugins: ['external-helpers'] }),
  ],
}
