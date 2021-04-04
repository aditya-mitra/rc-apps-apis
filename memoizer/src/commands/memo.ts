import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import sendMessageToUser from "../helpers/sendMessageToUser";

export class MemoSlashCommand implements ISlashCommand {
    command = "memo";
    i18nDescription = "take a new note or my existing ones";
    i18nParamsExample = "new|show";
    providesPreview = false;

    async executor(
        ctx: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        peris: IPersistence
    ): Promise<void> {
        const args = ctx.getArguments();
        if (args.length !== 1) {
            return sendMessageToUser({
                msg: "Provide only *1* argument",
                ctx,
                modify,
            });
        }
        switch (args[0]) {
            case "new":
            case "show":
                return;
            default:
                return sendMessageToUser({
                    msg:
                        "You have to provide either either `show` or `new` as the command argument",
                    ctx,
                    modify,
                });
        }
    }
}
