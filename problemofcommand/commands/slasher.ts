import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";

export class UltraSlashCommand implements ISlashCommand {
    public command = "slash";
    public i18nDescription = "checking if slash works";
    public i18nParamsExample = "";
    public providesPreview = false;

    constructor(private readonly app: App) {}

    public async executor(
        ctx: SlashCommandContext,
        read: IRead,
        modify: IModify
    ): Promise<void> {
        const args = ctx.getArguments();
        console.log(args);
        args.forEach((a) => console.log(a));
    }
}
