import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";

const { BullAdapter } = require("@bull-board/api/bullAdapter");
import Bull from "bull";
import Container from "typedi";

export default () => {
    const chatQueue: Bull.Queue = Container.get("chatQueue");
    const processQueue: Bull.Queue = Container.get("processQueue");

    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/admin/queues");
    createBullBoard({
        queues: [new BullAdapter(chatQueue), new BullAdapter(processQueue)],
        serverAdapter: serverAdapter,
    });

    return serverAdapter.getRouter();
};
