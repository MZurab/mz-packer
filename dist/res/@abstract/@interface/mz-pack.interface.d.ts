import { MzState, MzInputOnChangeState, MzInputOnChangeItem } from "../@type/common.type";
import { Subject } from "rxjs";
import { MzItemTypeEnum } from "../@enum/common.enum";
export interface MzCustomPackInterface {
    canWriteItem(id: string, item: any, typeChage: MzItemTypeEnum): Promise<boolean>;
    preWriteItem(id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>;
    postWriteItem(id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>;
    canChangeItem(id: string, item: any): Promise<boolean>;
    preChangeItem(id: string, item: any): Promise<void>;
    postChangeItem(id: string, item: any): Promise<void>;
    canRemoveItem(id: string, item?: any): Promise<boolean>;
    preRemoveItem(id: string, item?: any): Promise<void>;
    postRemoveItem(id: string, item?: any): Promise<void>;
    canChangeState(state: MzState): Promise<boolean>;
    preChangeState(state: MzState): Promise<void>;
    postChangeState(state: MzState): Promise<void>;
    canAddItem(id: string, item: any): Promise<boolean>;
    preAddItem(id: string, item: any): Promise<void>;
    postAddItem(id: string, item: any): Promise<void>;
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
    getStateFromPack(newState?: string): MzState;
    onWriteItem$: Subject<MzInputOnChangeItem>;
    onBindedWriteItem$: Subject<MzInputOnChangeItem>;
    writeItem(id: string, item: any, typeChage: MzItemTypeEnum, callback?: (state: MzState, id: string, item: any) => void): Promise<void>;
    onAddItem$: Subject<MzInputOnChangeItem>;
    onBindedAddItem$: Subject<MzInputOnChangeItem>;
    addItem(id: string, item: any, callback?: (state: MzState, id: string, item: any) => void): Promise<void>;
    onRemoveItem$: Subject<MzInputOnChangeItem>;
    onBindedRemoveItem$: Subject<MzInputOnChangeItem>;
    removeItem(id: string, item?: any): Promise<void>;
    onChangeItem$: Subject<MzInputOnChangeItem>;
    onBindedChangeItem$: Subject<MzInputOnChangeItem>;
    changeItem(id: string, item: any): Promise<void>;
    onChangeState$: Subject<MzInputOnChangeState>;
    onBindedChangeState$: Subject<MzInputOnChangeState>;
    changeState(state: MzState): Promise<void>;
}
