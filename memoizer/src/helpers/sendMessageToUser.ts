import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";

const avatarImageUrl = "https://presentationskills.me/notes/notes.png";

export default async function sendMessageToUser({
    msg,
    ctx,
    modify,
}: ISendMessageToUser) {
    const builtMessage = modify
        .getCreator()
        .startMessage()
        .setText(msg)
        .setUsernameAlias("memoizer")
        .setAvatarUrl(avatarImageUrl)
        .setRoom(ctx.getRoom())
        .setSender(ctx.getSender())
        .getMessage();

    return await modify.getNotifier().notifyUser(ctx.getSender(), builtMessage);
}

interface ISendMessageToUser {
    msg: string;
    ctx: SlashCommandContext;
    modify: IModify;
}
