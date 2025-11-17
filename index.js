import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

let counter = 0;

// Helper: get random date between two dates
function getRandomDate(start, end) {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const randomTime = random.int(startDate, endDate);
  return moment(randomTime).format();
}

async function makeCommits(n, batchSize = 1000) {
  for (let i = 0; i < n; i++) {
    counter++;

    
    const date = getRandomDate("2024-01-14", "2025-11-10");

    const data = { date };
    await jsonfile.writeFile(path, data);

    await git.add([path]);
    await git.commit(`Commit #${counter}`, [path], { "--date": date });

    // Push only every batch
    if (counter % batchSize === 0) {
      console.log(`Pushing after ${counter} commits...`);
      await git.push("origin", "main", ["--force"]);
    }
  }

  // Final push at the end
  console.log("Final push...");
  await git.push("origin", "main", ["--force"]);
  console.log("All commits done!");
}

makeCommits(1135);
