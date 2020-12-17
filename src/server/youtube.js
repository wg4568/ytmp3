const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const config = require("../../config.json");

function youtube(url) {
    var stream = ytdl(url, { filter: "audioonly" });
    var proc = new ffmpeg({ source: stream });
    proc.setFfmpegPath(config.ffmpeg);
    return proc;
}

export default youtube;
