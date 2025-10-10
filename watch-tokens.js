import {
    watch
} from 'chokidar'
import {
    exec
} from 'child_process'
import {
    promisify
} from 'util'

const execAsync = promisify(exec)

console.log('👀 Watching token files for changes...')

// Watch all token files
const watcher = watch('tokens/**/*.json', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
})

let isBuilding = false

watcher.on('change', async (path) => {
    if (isBuilding) return

    console.log(`\n🔄 Token file changed: ${path}`)
    isBuilding = true

    try {
        console.log('🔄 Rebuilding tokens...')
        await execAsync('node build-tokens.js')
        console.log('✅ Tokens rebuilt successfully!')
        console.log('💡 Refresh your browser to see changes')
    } catch (error) {
        console.error('❌ Build failed:', error.message)
    } finally {
        isBuilding = false
    }
})

watcher.on('add', async (path) => {
    console.log(`\n➕ New token file added: ${path}`)
    if (isBuilding) return

    isBuilding = true
    try {
        console.log('🔄 Rebuilding tokens...')
        await execAsync('node build-tokens.js')
        console.log('✅ Tokens rebuilt successfully!')
    } catch (error) {
        console.error('❌ Build failed:', error.message)
    } finally {
        isBuilding = false
    }
})

console.log('✅ Token watcher started!')
console.log('💡 Make changes to any token file to see auto-rebuild')