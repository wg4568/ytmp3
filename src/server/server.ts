import express from "express";
import Twig from "twig";

import youtube from "./youtube";
import config from "../../config.json";

Twig.cache(!config.debug);

const app = express();

app.use("/static", express.static("static"));

app.get("/", (req, res) => {
    Twig.renderFile("./pages/index.html", {}, (err, html) => {
        res.send(html);
    });
});

app.get("/fetch/:video", (req, res) => {
    res.set({
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="audio.mp3"`
    });

    youtube(req.params.video)
        .format("mp3")
        .on("error", () => {})
        .pipe(res, { end: true });
});

app.get("/favicon.ico", (req, res) => {
    res.sendFile("img/favicon.ico", { root: "static" });
});

app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
});
