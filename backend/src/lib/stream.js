import { StreamChat } from "stream-chat";
import "dotenv/config";

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;

if (!API_KEY || !API_SECRET) {
    console.error('api key or secret is missing');
}

const streamClient = StreamChat.getInstance(API_KEY, API_SECRET);

export const upstreamuser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("error updaating streamm user", error);
    }
}

export const generateStreamToken = (userId) => {
    try {
        const userIdstr = userId.toString();
        return streamClient.createToken(userIdstr);
    } catch (error) {
        console.error("error generating sstream token");
    }

};