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
    ) {
        const data = ctx.getInteractionData();
        const state = data.view.state as ICreateNewMemoModalState;

        if (!state || state.heading_block.text_input.length === 0) {
            return ctx.getInteractionResponder().viewErrorResponse({
                viewId: data.view.id,
                errors: {
                    // the field where you want to show the error. for ex - the text_input field
                    text_input: "memo cannot be blank",
                },
            });
        }

        // it is not possible to get the sender and the room in this context
        const b = modify
            .getCreator()
            .startMessage()
            .setText(state.heading_block.text_input)
            .setRoom({ id: "Kch7Kgm9sFzKHzAfo" } as any)
            .getMessage();

        modify.getNotifier().notifyUser({ id: "MnNsMqdBQJ4qs7c2L" } as any, b);

        return { success: true };
    }
}

interface ICreateNewMemoModalState {
    heading_block: {
        text_input: string;
    };
}
