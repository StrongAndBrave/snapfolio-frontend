import fs from 'fs';

const OUTPUT_FOLDER = 'out';

new Promise(() => {
    fs.writeFileSync(`${OUTPUT_FOLDER}/robots.txt`, 'User-agent: *\nDisallow: /');
});
