const StyleDictionary = require('style-dictionary')

// Register a custom transform to resolve token references
StyleDictionary.registerTransform({
    name: 'resolve-references',
    type: 'value',
    matcher: (token) => typeof token.value === 'string' && token.value.startsWith('{'),
    transformer: (token) => {
        // For now, just return the value as-is
        // In a real implementation, you'd resolve the reference
        return token.value
    }
})

module.exports = {
    source: ['tokens/ds*.tokens.json'],
    platforms: {
        js: {
            buildPath: 'dist/',
            transforms: ['resolve-references'],
            files: [{
                destination: 'tokens.js',
                format: 'javascript/es6'
            }]
        },
        css: {
            buildPath: 'dist/',
            transforms: ['resolve-references'],
            files: [{
                destination: 'tokens.css',
                format: 'css/variables'
            }]
        }
    }
}