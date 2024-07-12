import Bull from "bull";
import QueueMap from "../types/Queue";

export default async function bullQueueLoader(): Promise<QueueMap> {
    const queueMap: QueueMap = {};
    const chatQueue = new Bull("chatQueue",{
    	redis:{
		port: 6379,
		host: "redis"
	}
    });
    const processQueue = new Bull("processQueue",{
    	redis:{
		port: 6379,
		host: "redis"
	}
    });
    queueMap[chatQueue.name] = chatQueue;
    queueMap[processQueue.name] = processQueue;
    // chatQueue.on("error", (error) => {
    //     console.error("Queue error:", error);
    // });
    return queueMap;
}
