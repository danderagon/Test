// index.js
const fs = require('fs');
const simpleGit = require('simple-git');
const dayjs = require('dayjs');
const git = simpleGit();

const data = JSON.parse(fs.readFileSync('data.json'));

(async () => {
  for (const item of data) {
    const { date, count } = item;

    for (let i = 0; i < count; i++) {
      fs.writeFileSync('commit.txt', `${date} - ${i} - ${Date.now()}`);
      await git.add('./*');
      await git.commit(`Commit on ${date}`, undefined, {
        '--date': `${date}T12:00:00`
      });

      process.env.GIT_AUTHOR_DATE = `${date}T12:00:00`;
      process.env.GIT_COMMITTER_DATE = `${date}T12:00:00`;
    }
  }

  await git.push('origin', 'main');
  console.log('✅ All commits pushed!');
})();
