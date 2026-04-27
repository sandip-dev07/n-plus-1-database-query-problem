import { DatabaseSync } from "node:sqlite";
import { migrate } from "./tables.js";
let count = 0;

function main() {
  const database = new DatabaseSync("./local.db");
  migrate(database, false);

  const users = getUsers(database);
  // console.log(JSON.stringify(users, null, 2));

  const res = users.map((user) => {
    return {
      ...user,
      posts: getPosts(database, user.id),
    };
  });

  console.log(JSON.stringify(res, null, 2));

  console.log("Total queries: ", count); // N+1 queries
}

function getUsers(database) {
  count += 1;
  const select = database.prepare(`SELECT * FROM users`);

  return select.all();
}

function getPosts(database, userId) {
  count += 1;
  const select = database.prepare(`SELECT * FROM posts WHERE user_id = ?`);

  return select.all(userId);
}

main();
