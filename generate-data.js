// generate-data.js
const fs = require('fs');
const dayjs = require('dayjs');

const startDate = dayjs().subtract(1, 'week'); // 1 năm trước
const data = [];

for (let i = 0; i < 1 * 7; i++) {
  const date = startDate.add(i, 'day');
  const weekday = date.day(); // 0 = Sunday, 6 = Saturday

  // 3-4 ngày/tuần ngẫu nhiên có commit
  const active = Math.random() < 4 / 7;

  if (active) {
    const count = Math.floor(Math.random() * 5) + 1; // 1 đến 5 commit
    data.push({ date: date.format('YYYY-MM-DD'), count });
  }
}

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('✅ Generated data.json!');

