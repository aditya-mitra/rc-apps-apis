import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { UnsplashCommand } from "./commands/unsplash";

export class UploaderApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    protected async extendConfiguration(config: IConfigurationExtend) {
        await config.slashCommands.provideSlashCommand(
            new UnsplashCommand(this)
        );
    }
}
