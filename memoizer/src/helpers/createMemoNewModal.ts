import {
    IModify,
    IPersistence,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

import generateRandomUUID from "../utils/generateUUID";

export default async function createMemoNewModal({
    perist,
    modify,
    user,
}: ICreateNewMemoModal): Promise<IUIKitModalViewParam> {
    const viewID = generateRandomUUID();

    // const association = new RocketChatAssociationRecord(
    //     RocketChatAssociationModel.USER,
    //     user.id
    // );

    const block = modify.getCreator().getBlockBuilder();

    block.addDividerBlock();

    block.addInputBlock({
        blockId: "heading_block",
        element: block.newPlainTextInputElement({
            placeholder: block.newPlainTextObject("Write a note to yourself!"),
            multiline: true,
        }),
        label: block.newPlainTextObject("Note"),
    });

    block.addDividerBlock();

    return {
        id: viewID,
        title: block.newPlainTextObject("Create a new Memo for this room"),
        submit: block.newButtonElement({
            text: block.newPlainTextObject("Save"),
        }),
        blocks: block.getBlocks(),
    };

    // store the data in the object and associate it with user's id
}

interface ICreateNewMemoModal {
    perist: IPersistence;
    modify: IModify;
    /**
     * get the user using `ctx.getSender()`
     */
    user: IUser;
    room: IRoom;
}

/*
<img> SAVE YOUR NOTES
---------------------------------------
<input give your note a description>
---------------------------------------
<button save>
*/
