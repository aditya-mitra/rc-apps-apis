import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";

export class SlashCommander implements ISlashCommand {
    public command = "groom";
    public i18nDescription = "grooming";
    public i18nParamsExample = "are the params visible";
    public providesPreview = false;

    constructor(private readonly app: App) {}

    public async executor(
        ctx: SlashCommandContext,
        read: IRead,
        modify: IModify
    ): Promise<void> {
        const args = ctx.getArguments();
        args.forEach((c) => console.log(c));
    }
}
