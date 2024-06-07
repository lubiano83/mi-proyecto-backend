/* Cliente */
const SOCKET = io();
const chatText = document.getElementById("message");
const chatLogs = document.getElementById("message-logs");
const userName = document.getElementById("user");

let user = null;

Swal.fire({
    title: "Identificate",
    input: "text",
    confirmButtonText: "Ingresar",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "Ingresa tu Nombre de Usuario";
    },
}).then((result) => {
    user = { name: result.value };
    userName.innerText = user.name;
    SOCKET.emit("authenticated", user);
});

chatText.onkeyup = (event) => { // onkeyup es la accion de soltar el boton (evento).
    if(event.key === "Enter"){
        SOCKET.emit("message", { user, message: chatText.value });
        chatText.value = "";
    }
};

SOCKET.on("message-logs", (data) => {
    chatLogs.innerHTML = "";
    data.MESSAGES.forEach((item) => {
        const LI = document.createElement("li");
        LI.innerHTML = `${item.user.name} dice: <b>${item.message}</b>`;
        chatLogs.append(LI);
    });
});

SOCKET.on("new-user", (data) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        timer: 3000,
        timeProgressBar: true,
        title: `${data.name} se ha unido al Chat.}`,
        icon: "success",
    });
});