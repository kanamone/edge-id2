import { mkdirSync, writeFileSync } from 'node:fs'

mkdirSync('lib', { recursive: true })
mkdirSync('dist', { recursive: true })

const files = [
    [
        'dist/define.js',
        (
            await (
                await Bun.build({
                    entrypoints: ['define.ts'],
                    minify: {
                        whitespace: false,
                        syntax: true,
                        identifiers: true,
                    },
                })
            ).outputs[0].text()
        )
            .trim()
            .replace(/^\/\/.+/, '')
            .trim()
            .replace(/^function \w+/, 'function defineID')
            .replace(/export \{[^}]+\};$/m, '')
            .trim(),
    ],
    [
        'dist/format.js',
        (
            await (
                await Bun.build({
                    entrypoints: ['format.ts'],
                    minify: {
                        whitespace: false,
                        syntax: true,
                        identifiers: true,
                    },
                })
            ).outputs[0].text()
        )
            .trim()
            .replace(/^\/\/.+/, '')
            .trim()
            .replace(/^function \w+/, 'function createFormat')
            .replace(/export \{[^}]+\};$/m, '')
            .trim(),
    ],
    [
        'lib/index.js',
        (
            await (
                await Bun.build({
                    entrypoints: ['index.ts'],
                    external: ['./define', './format'],
                    minify: false,
                })
            ).outputs[0].text()
        )
    ],
]

for (const [file, content] of files) {
    writeFileSync(file, content)
}

const readme = files.filter(([f]) => f.startsWith('dist')).map(([file, content]) => `## ${file}\n\`\`\`js\n${content}\n\`\`\``).join('\n\n')

writeFileSync('README.md', `# edge-id2\n\n${readme}`)
