import {MzPackInterface} from "../@interface/mz-pack.interface";
import {MzItemTypeEnum} from "../@enum/common.enum";

export type MzStorageOfPacks = {
    [s: string]: {
        class: MzPackInterface,
        story?: {
            ofAdd?: any[],
            ofRemove?: any[],
            ofEdit?: any[],
        },
        observers: string[]
    }
}

export type MzState = {
    current: string,
    previous: string
}

export type MzInputOnChangeState = {
    packId: string,
    state: MzState,
    storage: any
}

export type MzInputOnChangeItem = {
    packId: string,
    state: MzState,
    storage: any,
    item: any,
    type: MzItemTypeEnum
}

export type MzInputOnChangeStorage = {
    storage: any
}

export type MzInputWrite = {
    id: string,
    item: any,
    typeChange: MzItemTypeEnum
}

export type MzInputAction = {
    id: string,
    item: any
}