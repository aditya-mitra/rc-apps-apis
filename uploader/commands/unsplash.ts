import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";

export class UnsplashCommand implements ISlashCommand {
    public command = "unsplash";
    public i18nDescription = "sends a random unsplash image to the channel";
    public i18nParamsExample = "";
    public providesPreview = false;

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persist: IPersistence
    ): Promise<void> {
        const message = "Random unplash image";

        console.log("building message!");

        const messageStructure = await modify.getCreator().startMessage();
        const sender = context.getSender(); // the user calling the slashcommand
        const room = context.getRoom(); // the current room

        const response = await http.get("https://source.unsplash.com/random", {
            encoding: null,
        });
        console.log(response.data, "was the response");

        messageStructure.setSender(sender).setRoom(room).setText(message);

        // await this.getRandomUnsplashImage(http);

        await modify.getCreator().finish(messageStructure);
    }
}
