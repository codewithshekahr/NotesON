import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, 'public', 'all year notes');
const structure = {};

const semesters = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

for (const sem of semesters) {
    const semPath = path.join(rootDir, sem);
    const subjects = fs.readdirSync(semPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    structure[sem] = subjects;
}

fs.writeFileSync(path.join(__dirname, 'dir_structure.json'), JSON.stringify(structure, null, 2));
console.log('Done');
