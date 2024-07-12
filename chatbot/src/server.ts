import createApp from "./app";
import http from "http";
import { init } from "./io";
(async () => {
    const app = await createApp();
    const server = http.createServer(app);
    init(server);
    server.listen(3000, () => {
        console.log("server listening on 3000");
    });
})();

