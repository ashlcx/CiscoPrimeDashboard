var fs = require('fs');
try {
    var obj = JSON.parse(fs.readFileSync('config.json', 'utf8'));
} catch (e) {
    console.log("config.json does not exist or is corrupt(Check for trailing commas on each line). Exiting.....");
    process.exit(404);
} finally {
    if (!obj.username || !obj.password || !obj.server || !obj.clientSide.title) {
        console.log("Incomplete config file... Exiting");
        process.exit(500);
    }
}

try {
    var logoFile = fs.readFileSync('logo.png', 'base64');
    obj.clientSide.logo = logoFile;
} catch (e) {
    //console.log("error processing image");
}


export default obj;
