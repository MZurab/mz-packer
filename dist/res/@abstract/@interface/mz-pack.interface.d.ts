import { MzState, MzInputOnChangeState, MzInputOnChangeItem, MzInputOnEmitType } from "../@type/common.type";
import { Subject } from "rxjs";
import { MzItemTypeEnum } from "../@enum/common.enum";
import { MzPackerInterface } from "./mz-packer.interface";
export interface MzCustomPackInterface {
    canWriteItem(id: string, item: any, typeChage: MzItemTypeEnum, packId: string): Promise<boolean>;
    preWriteItem(id: string, item: any, typeChage: MzItemTypeEnum, packId: string): Promise<void>;
    postWriteItem(id: string, item: any, typeChage: MzItemTypeEnum, packId: string): Promise<void>;
    canChangeItem(id: string, item: any, packId: string): Promise<boolean>;
    preChangeItem(id: string, item: any, packId: string): Promise<void>;
    postChangeItem(id: string, item: any, packId: string): Promise<void>;
    canRemoveItem(id: string, packId: string, item?: any): Promise<boolean>;
    preRemoveItem(id: string, packId: string, item?: any): Promise<void>;
    postRemoveItem(id: string, packId: string, item?: any): Promise<void>;
    canChangeState(state: MzState, packId: string): Promise<boolean>;
    preChangeState(state: MzState, packId: string): Promise<void>;
    postChangeState(state: MzState, packId: string): Promise<void>;
    canAddItem(id: string, item: any, packId: string): Promise<boolean>;
    preAddItem(id: string, item: any, packId: string): Promise<void>;
    postAddItem(id: string, item: any, packId: string): Promise<void>;
    canEmit(data: any, packId?: string): Promise<boolean>;
    preEmit(data: any, packId?: string): Promise<void>;
    postEmit(data: any, packId?: string): Promise<void>;
}
export interface MzPackInterface extends MzCustomPackInterface {
    id: string;
    storage: any;
    state: string | null;
    lastState: string | null;
    allItems: {
        id: string;
        item: any;
    }[];
    addPacker(...packer: MzPackerInterface[]): void;
    getStateFromPack(newState?: string): MzState;
    saveMyRetranslators(...packs: MzPackInterface[]): void;
    removeMyRetranslators(...packs: MzPackInterface[]): void;
    retranslateToPacks(...packs: MzPackInterface[]): void;
    addPackForRetranslate(...packs: MzPackInterface[]): void;
    removePackFromRetranslate(...packs: MzPackInterface[]): void;
    clearPackForRetranslate(): void;
    onEmit$: Subject<MzInputOnEmitType>;
    emit(data: any, packIds: string[], packId?: string): Promise<void>;
    onWriteItem$: Subject<MzInputOnChangeItem>;
    writeItem(id: string, item: any, typeChage: MzItemTypeEnum, packId: string, callback?: (state: MzState, id: string, item: any) => void): Promise<void>;
    onAddItem$: Subject<MzInputOnChangeItem>;
    addItem(id: string, item: any, packId: string, callback?: (state: MzState, id: string, item: any) => void): Promise<void>;
    onRemoveItem$: Subject<MzInputOnChangeItem>;
    removeItem(id: string, packId: string, item?: any): Promise<void>;
    onChangeItem$: Subject<MzInputOnChangeItem>;
    changeItem(id: string, packId: string, item: any): Promise<void>;
    onChangeState$: Subject<MzInputOnChangeState>;
    changeState(state: MzState, packId: string): Promise<void>;
}
