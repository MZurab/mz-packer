import {MzPackInterface} from "./mz-pack.interface";
import {MzState} from "../@type/common.type";

export interface MzPackerInterface {
    storage: any,

    addPack(...pack: MzPackInterface[]): void

    add (
        id: string,
        item: any,
        packId?: string,
        consistently?: boolean,
        callback?: (state: MzState, id: string, item: any) => void
    ): Promise<void>

    remove (
        id: string,
        item: any,
        packId?: string,
        consistently?: boolean,
    ): Promise<void>

    change (
        id: string,
        item: any,
        packId?: string,
        consistently?: boolean,
    ): Promise<void>

    changeState(
        state: any,
        packId?: string,
        consistently?: boolean,
    ): void
}