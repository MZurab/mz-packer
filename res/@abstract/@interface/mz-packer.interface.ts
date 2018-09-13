import {MzPackInterface} from "./mz-pack.interface";
import {MzState} from "../@type/common.type";

export interface MzPackerInterface {
    storage: any,

    addPack(...pack: MzPackInterface[]): void

    //@< BLOCK FOR ADD ITEM
        canAddItem (
            pack: MzPackInterface,
            state: MzState
        ): Promise<boolean>

        preAddItem (
            pack: MzPackInterface,
            id: string,
            item: any
        ): Promise<void>

        addItem (
            id: string,
            item: any,
            packId?: string,
            consistently?: boolean,
            callback?: (packId: string, state: MzState, id: string, item: any) => void
        ): Promise<void>


        postAddItem (
            pack: MzPackInterface,
            id: string,
            item: any
        ): Promise<void>
    //@> BLOCK FOR ADD ITEM

    //@< BLOCK FOR REMOVE ITEM
        canRemoveItem (
            pack: MzPackInterface,
            id: string,
            state: MzState
        ): Promise<boolean>

        preRemoveItem (
            pack: MzPackInterface,
            id: string,
            consistently?: boolean
        ): Promise<void>

        removeItem (
            id: string,
            packId?: string,
            consistently?: boolean,
            callback?: (packId: string, state: MzState, id: string, item: any) => void
        ): Promise<void>


        postRemoveItem (
            pack: MzPackInterface,
            id: string,
            consistently?: boolean
        ): Promise<void>
    //@> BLOCK FOR REMOVE ITEM

    remove (
        id: string,
        item: any,
        packId?: string,
        consistently?: boolean
    ): Promise<void>

    change (
        id: string,
        item: any,
        packId?: string,
        consistently?: boolean,
    ): Promise<void>

    changeState (
        state: any,
        packId?: string,
        consistently?: boolean,
    ): Promise<void>
}