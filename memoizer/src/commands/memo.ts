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
import createMemoNewModal from "../helpers/createMemoNewModal";
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
        perist: IPersistence
    ): Promise<void> {
        const args = ctx.getArguments();

        const triggerId = ctx.getTriggerId();

        if (args.length !== 1) {
            return sendMessageToUser({
                msg: "Provide only *1* argument",
                ctx,
                modify,
            });
        }
        switch (args[0]) {
            case "new":
                if (triggerId) {
                    const modal = await createMemoNewModal({
                        modify,
                        perist,
                        user: ctx.getSender(),
                        room: ctx.getRoom(),
                    });
                    await modify
                        .getUiController()
                        .openModalView(modal, { triggerId }, ctx.getSender());
                }

                break;
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
