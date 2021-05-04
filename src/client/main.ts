import config from "../../config.json";

const input = document.getElementById("url") as HTMLInputElement;
const button = document.getElementById("submit") as HTMLButtonElement;

function get_video_id(raw: string) {
    let video_id = raw.split("v=")[1];
    if (!video_id || video_id.length < 11) return raw;

    let amp = video_id.indexOf("&");
    if (amp != -1) video_id = video_id.substring(0, amp);
    return video_id;
}

function validate_url(url: string, callback: (v: boolean, i: string) => any) {
    if (url == undefined || url == "") {
        callback(false, "");
        return;
    }

    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    var valid = (match && match[2].length == 11) || url.length == 11;
    if (!valid) {
        callback(false, "");
        return;
    }

    var video_id = get_video_id(url);

    var img = new Image();
    img.src = "http://img.youtube.com/vi/" + video_id + "/mqdefault.jpg";
    img.onload = () => {
        var exists = img.width == 320;
        callback(exists, video_id);
    };
}

button.onclick = () => {
    validate_url(input.value, (valid, video_id) => {
        if (!valid) alert("Please enter a valid URL");
        else window.location.href = config.base_url + "/fetch/" + video_id;
    });
};
