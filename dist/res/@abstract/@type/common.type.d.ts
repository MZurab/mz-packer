import { MzPackInterface } from "../@interface/mz-pack.interface";
import { MzItemTypeEnum } from "../@enum/common.enum";
export declare type MzStorageOfPacks = {
    [s: string]: {
        class: MzPackInterface;
        observers: string[];
    };
};
export declare type MzState = {
    current: string | null;
    previous: string | null;
};
export declare type MzInputOnChangeState = {
    packId?: string;
    state: MzState;
    storage: any;
};
export declare type MzInputOnChangeItem = {
    packId?: string;
    state: MzState;
    storage: any;
    item: any;
    id: any;
    type: MzItemTypeEnum;
};
export declare type MzInputOnAddItem = {
    packId?: string;
    state: MzState;
    storage: any;
    item: any;
    type: MzItemTypeEnum;
};
export declare type MzInputOnChangeStorage = {
    storage: any;
};
export declare type MzInputWrite = {
    id: string;
    item: any;
    typeChange: MzItemTypeEnum;
};
export declare type MzInputAction = {
    id: string;
    item?: any;
};
