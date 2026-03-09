import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, 'public', 'all year notes');
const result = {};

// Helper to recursively get all files in a directory
function getFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(function (file) {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getFiles(path.join(dirPath, file), arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, file));
        }
    });

    return arrayOfFiles;
}

const semesters = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

for (const semDir of semesters) {
    const semName = semDir.name;
    // Map directory name to semester number
    let semNumber = semName.match(/\d/)?.[0] || '1';

    // Fallback if the user uploaded something else
    if (semName === '3sem') semNumber = '3';
    else if (semName === '4th sem') semNumber = '4';
    else if (semName.includes('5')) semNumber = '5';
    else if (semName.includes('6')) semNumber = '6';
    else if (semName.includes('7')) semNumber = '7';

    const semPath = path.join(rootDir, semName);
    const allFiles = getFiles(semPath);

    if (!result[semNumber]) {
        result[semNumber] = [];
    }

    allFiles.forEach((absPath, index) => {
        const relativeToPublic = absPath.substring(path.join(__dirname, 'public').length).replace(/\\/g, '/');
        const fileName = path.basename(absPath);
        result[semNumber].push({
            id: `FILE-${semNumber}-${index}`,
            name: fileName,
            type: 'Local File',
            prof: 'Staff',
            uploaderId: 'local-owner',
            uploaderName: 'Local Storage',
            link: relativeToPublic
        });
    });
}

const output = { ece: result };

fs.writeFileSync(path.join(__dirname, 'flattened_data.json'), JSON.stringify(output, null, 2));
console.log('Flattening complete.');
