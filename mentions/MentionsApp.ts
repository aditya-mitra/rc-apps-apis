import {
    IAppAccessors,
    IHttp,
    ILogger,
    IMessageBuilder,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import {
    IMessage,
    IPreMessageSentModify,
} from "@rocket.chat/apps-engine/definition/messages";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";

export class MentionsApp extends App implements IPreMessageSentModify {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    async executePreMessageSentModify(
        message: IMessage,
        builder: IMessageBuilder,
        read: IRead,
        http: IHttp,
        storage: IPersistence
    ): Promise<IMessage> {
        const mentions = message.text?.match(/\B@[a-z0-9_-]+/gi);

        const buildingMessage = builder
            .setSender(message.sender)
            .setRoom(message.room);

        if (mentions && mentions.length > 0) {
            console.log("found mentions - ", mentions);
            const r =
                message.text?.replace(
                    /\B@[a-z0-9_-]+/gi,
                    (w) => "`" + w + "`"
                ) || "";
            buildingMessage.setText(r);
        }

        return buildingMessage.getMessage();

        // const storageRead = read.getPersistenceReader();
    }
}
