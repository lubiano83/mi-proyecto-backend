import express from "express";
import PATH from "./src/utils/path.js";
import handlebars from "./src/config/handlebars.config.js";
import ROUTER from "./src/routes/chat.router.js";
import serverSocket from "./src/config/socket.config.js";

const SERVER = express();
const PORT = 8080;
const HOST = "localhost";

SERVER.use("/chat", ROUTER);

// configuracion del motor de plantillas
handlebars.CONFIG(SERVER);

// declaracion de ruta estatica
SERVER.use("/api/public", express.static(PATH.public));

// control de rutas inexistentes
SERVER.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404: Esa URL no existe</h1>");
});

// control de errores internos
SERVER.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500: Error en el Servidor</h1>");
});

// metodo oyente de solicitudes
const serverHTTP = SERVER.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});

serverSocket.CONFIG(serverHTTP);