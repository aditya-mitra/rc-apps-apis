import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { SlashCommander } from "./commands";

export class GroomApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    protected async extendConfiguration(
        config: IConfigurationExtend
    ): Promise<void> {
        await config.slashCommands.provideSlashCommand(
            new SlashCommander(this)
        );
    }
}
