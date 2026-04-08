// Import file system module
const fs = require('fs');

// File name
const fileName = 'sample.txt';

// 1. Create / Write file
fs.writeFile(fileName, 'Hello, this is the initial content.\n', (err) => {
    if (err) {
        console.error('Error creating file:', err);
        return;
    }
    console.log('File created successfully.');

    // 2. Read file
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('\nFile content after write:\n', data);

        // 3. Append data
        fs.appendFile(fileName, 'This is appended content.\n', (err) => {
            if (err) {
                console.error('Error appending file:', err);
                return;
            }
            console.log('Data appended successfully.');

            // 4. Read again after append
            fs.readFile(fileName, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }
                console.log('\nFile content after append:\n', data);

                // 5. Delete file
                fs.unlink(fileName, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return;
                    }
                    console.log('File deleted successfully.');
                });
            });
        });
    });
});