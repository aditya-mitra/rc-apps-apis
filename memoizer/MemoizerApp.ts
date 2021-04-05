import {
    IAppAccessors,
    IConfigurationExtend,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import {
    IUIKitInteractionHandler,
    IUIKitResponse,
    UIKitViewSubmitInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { MemoSlashCommand } from "./src/commands/memo";

export class MemoizerApp extends App implements IUIKitInteractionHandler {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    protected async extendConfiguration(
        config: IConfigurationExtend
    ): Promise<void> {
        await config.slashCommands.provideSlashCommand(new MemoSlashCommand());
    }

    async executeViewSubmitHandler(
        ctx: UIKitViewSubmitInteractionContext,
        read: IRead,
        http: IHttp,
        persist: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        const data = ctx.getInteractionData();

        console.log(data.view.state, "was the data");

        return { success: true };
    }
}
