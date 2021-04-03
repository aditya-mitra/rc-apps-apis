import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";

export class SlashCommand implements ISlashCommand {
    command = "slash";
    i18nDescription = "check which slash command you gave";
    i18nParamsExample = "";
    providesPreview = false;
    async executor(
        ctx: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp
    ) {
        const commands = ctx.getArguments();
        if (!commands || commands.length === 0) {
            throw new Error("found no commands, bud");
        }
        commands.map((c) => {
            console.log(c);
        });
    }
}
