import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import sucrase from '@rollup/plugin-sucrase'

const rollup = {
    input: './src/index.ts',
    output: [
        {
            dir: 'dist',
            format: 'cjs',
        },
    ],
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json',
            rollupCommonJSResolveHack: false,
            clean: true,
        }),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        }),
        external(),
        resolve(),
        terser(),
        sucrase({
            exclude: ['node_modules/**'],
            transforms: ['typescript', 'jsx'],
        }),
    ],
}

export default rollup
