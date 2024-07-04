import { mkdirSync, writeFileSync } from 'node:fs'

mkdirSync('lib', { recursive: true })

const files = [
    [
        'lib/define.js',
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
        'lib/format.js',
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
]

for (const [file, content] of files) {
    writeFileSync(file, content)
}

const readme = files.map(([file, content]) => `## ${file}\n\`\`\`js\n${content}\n\`\`\``).join('\n\n')

writeFileSync('README.md', `# edge-id2\n\n${readme}`)
