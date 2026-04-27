import { DatabaseSync } from "node:sqlite";
import { migrate } from "./tables.js";

let queryCount = 0;

function main() {
  const database = new DatabaseSync("./local.db");

  migrate(database, false);

  const usersWithPosts = getUsersWithPosts(database);

  console.log(JSON.stringify(usersWithPosts, null, 2));
  console.log("Total queries:", queryCount); // 1 query
}

function getUsersWithPosts(database) {
  queryCount += 1;

  const select = database.prepare(`
    SELECT 
      users.id AS user_id,
      users.name AS user_name,
      users.email AS user_email,
      posts.id AS post_id,
      posts.title AS post_title,
      posts.body AS post_body
    FROM users
    LEFT JOIN posts ON posts.user_id = users.id
  `);

  const rows = select.all();

  const users = {};

  for (const row of rows) {
    const {
      user_id,
      user_name,
      user_email,
      post_id,
      post_title,
      post_body,
    } = row;

    const user = (users[user_id] ??= {
      id: user_id,
      name: user_name,
      email: user_email,
      posts: [],
    });

    // Only add post if it exists
    if (post_id !== null) {
      user.posts.push({
        id: post_id,
        title: post_title,
        body: post_body,
      });
    }
  }

  return Object.values(users);
}

main();

// const users = await User.find().populate("posts"); → MongoDb Query