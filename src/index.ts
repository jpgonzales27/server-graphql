import { exec } from "child_process";

const serverType = process.argv[2]; // Get the server type from command line argument

console.log(`Server Type: ${serverType}`);

if (serverType === "apollo") {
  exec("node ./dist/src/apolloServer.js", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
  });
} else if (serverType === "yoga") {
  exec("node ./dist/src/yogaServer.js", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
  });
} else {
  console.log("Please specify the server type: apollo or yoga");
}
