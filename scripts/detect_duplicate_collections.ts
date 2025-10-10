import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TOKENS_DIR = path.resolve(__dirname, '../tokens')

interface TokenFile {
  collection?: {
    name: string
  }
}

function getAllJsonFiles(dir: string): string[] {
  let results: string[] = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJsonFiles(filePath))
    } else if (file.endsWith('.json')) {
      results.push(path.relative(TOKENS_DIR, filePath))
    }
  })

  return results
}

const includedFiles = getAllJsonFiles(TOKENS_DIR)

const seen: Record<string, string[]> = {} 

for (const relativePath of includedFiles) {
  const fullPath = path.join(TOKENS_DIR, relativePath)

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  File not found: ${relativePath}`)
    continue
  }

  try {
    const data = fs.readFileSync(fullPath, 'utf-8')
    const json = JSON.parse(data) as TokenFile

    const collectionName = json.collection?.name
    if (collectionName) {
      if (!seen[collectionName]) seen[collectionName] = []
      seen[collectionName].push(relativePath)
    } else {
      console.warn(`⚠️  No 'collection.name' found in: ${relativePath}`)
    }
  } catch (err) {
    console.error(`❌ Error reading ${relativePath}:`, err)
  }
}


let hasDuplicates = false
console.log('\n🔎 Checking for duplicate collection names...\n')

for (const [name, files] of Object.entries(seen)) {
  if (files.length > 1) {
    hasDuplicates = true
    console.error(`❌ Duplicate collection "${name}" found in files: ${files.join(', ')}`)
  }
}

if (!hasDuplicates) {
  console.log('✅ No duplicate collections found.')
  process.exit(0)
} else {
  console.error('\n❗ Resolve duplicates before syncing to Figma.\n')
  process.exit(1)
}
