const input = document.getElementById("url") as HTMLInputElement;
const button = document.getElementById("submit") as HTMLButtonElement;

button.onclick = () => {
    let url = input.value;
    window.location.href = "/fetch/" + url;
};
