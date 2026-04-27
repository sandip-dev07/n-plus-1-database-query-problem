export async function migrate(database, shouldSeed = false) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
    `);

  database.exec(`
    CREATE TABLE IF NOT EXISTS posts(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
    `);

  if (!shouldSeed) return;

  const users = [
    ['Alice', 'alice@example.com'],
    ['Bob', 'bob@example.com'],
    ['Charlie', 'charlie@example.com'],
    ['David', 'david@example.com'],
    ['Emma', 'emma@example.com'],
    ['Frank', 'frank@example.com'],
    ['Grace', 'grace@example.com'],
    ['Hannah', 'hannah@example.com'],
    ['Ian', 'ian@example.com'],
    ['Julia', 'julia@example.com'],
    ['Kevin', 'kevin@example.com'],
    ['Lily', 'lily@example.com'],
    ['Mark', 'mark@example.com'],
    ['Nora', 'nora@example.com'],
    ['Oliver', 'oliver@example.com'],
    ['Paula', 'paula@example.com'],
    ['Quentin', 'quentin@example.com'],
    ['Rachel', 'rachel@example.com'],
    ['Sam', 'sam@example.com'],
    ['Tina', 'tina@example.com'],
    ['Uma', 'uma@example.com'],
    ['Victor', 'victor@example.com'],
    ['Wendy', 'wendy@example.com'],
    ['Xavier', 'xavier@example.com'],
    ['Yara', 'yara@example.com'],
    ['Zane', 'zane@example.com'],
    ['Ava', 'ava@example.com'],
    ['Blake', 'blake@example.com'],
    ['Cara', 'cara@example.com'],
    ['Derek', 'derek@example.com'],
    ['Elena', 'elena@example.com'],
    ['Felix', 'felix@example.com'],
    ['Gina', 'gina@example.com'],
    ['Henry', 'henry@example.com'],
    ['Ivy', 'ivy@example.com'],
    ['Jack', 'jack@example.com'],
    ['Kara', 'kara@example.com'],
    ['Leo', 'leo@example.com'],
    ['Maya', 'maya@example.com'],
    ['Noah', 'noah@example.com'],
    ['Olga', 'olga@example.com'],
    ['Peter', 'peter@example.com'],
    ['Queenie', 'queenie@example.com'],
    ['Ryan', 'ryan@example.com'],
    ['Sofia', 'sofia@example.com'],
    ['Thomas', 'thomas@example.com'],
    ['Ursula', 'ursula@example.com'],
    ['Vince', 'vince@example.com'],
    ['Willow', 'willow@example.com'],
    ['Xena', 'xena@example.com'],
    ['Yusuf', 'yusuf@example.com'],
    ['Zara', 'zara@example.com'],
    ['Aaron', 'aaron@example.com'],
    ['Bianca', 'bianca@example.com'],
    ['Cody', 'cody@example.com'],
    ['Diana', 'diana@example.com'],
    ['Ethan', 'ethan@example.com'],
    ['Fiona', 'fiona@example.com'],
    ['Gavin', 'gavin@example.com'],
    ['Holly', 'holly@example.com'],
    ['Isaac', 'isaac@example.com'],
    ['Jade', 'jade@example.com'],
    ['Kyle', 'kyle@example.com'],
    ['Lara', 'lara@example.com'],
    ['Milo', 'milo@example.com'],
    ['Nina', 'nina@example.com'],
    ['Owen', 'owen@example.com'],
    ['Paige', 'paige@example.com'],
    ['Quinn', 'quinn@example.com'],
    ['Ralph', 'ralph@example.com'],
    ['Sienna', 'sienna@example.com'],
    ['Tyler', 'tyler@example.com'],
    ['Una', 'una@example.com'],
    ['Victor2', 'victor2@example.com'],
    ['Wade', 'wade@example.com'],
    ['Xavier2', 'xavier2@example.com'],
    ['Yasmine', 'yasmine@example.com'],
    ['Zeke', 'zeke@example.com'],
    ['Adam', 'adam@example.com'],
    ['Bella', 'bella@example.com'],
    ['Caleb', 'caleb@example.com'],
    ['Daphne', 'daphne@example.com'],
    ['Eli', 'eli@example.com'],
    ['Faye', 'faye@example.com'],
    ['Gideon', 'gideon@example.com'],
    ['Hazel', 'hazel@example.com'],
    ['Iris', 'iris@example.com'],
    ['Jonah', 'jonah@example.com'],
    ['Kendra', 'kendra@example.com'],
    ['Liam', 'liam@example.com'],
    ['Mona', 'mona@example.com'],
    ['Nolan', 'nolan@example.com'],
    ['Ophelia', 'ophelia@example.com'],
    ['Patrick', 'patrick@example.com'],
    ['Queena', 'queena@example.com'],
    ['Renee', 'renee@example.com'],
    ['Simon', 'simon@example.com'],
    ['Tara', 'tara@example.com'],
    ['Ulysses', 'ulysses@example.com'],
    ['Valerie', 'valerie@example.com'],
    ['Winston', 'winston@example.com'],
    ['Ximena', 'ximena@example.com'],
    ['Yvonne', 'yvonne@example.com'],
  ];

  for (const [name, email] of users) {
    console.log({ name, email });
    const insert = await database.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    await insert.run(name, email);
  }

  console.log('Database seeded with 100 users!');

  const titles = [
    'Hello World',
    'My First Post',
    'Random Thoughts',
    'Daily Journal',
    'Tech Tips',
    'Learning SQLite',
    'Node.js Adventures',
    'Coding Life',
    'React Tips',
    'Debugging Tricks',
    'Fun with JS',
    'Database Tips',
  ];

  const bodies = [
    'This is a sample post content.',
    'Learning Node.js is fun!',
    'SQLite makes life easier for small apps.',
    'Debugging is half the job done.',
    'Random thoughts of the day.',
    'Sharing tech tips with friends.',
    'Writing code every day.',
    'React makes UI easier to build.',
    'Database seeding is important.',
    "Let's learn together!",
  ];

  const NUM_POSTS = 200;

  for (let i = 0; i < NUM_POSTS; i++) {
    const title = titles[getRandomInt(0, titles.length - 1)] + ` #${i + 1}`;
    const body = bodies[getRandomInt(0, bodies.length - 1)];
    const user_id = getRandomInt(1, 100); // random user_id between 1-100

    const insert = await database.prepare(
      'INSERT INTO posts (title, body, user_id) VALUES (?, ?, ?)'
    );
    await insert.run(title, body, user_id);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log(`${NUM_POSTS} posts inserted successfully!`);
}