import { MzPackInterface } from "./mz-pack.interface";
import { MzState, MzInputOnChangeItem, MzInputOnChangeState } from "../@type/common.type";
import { Observable } from "rxjs";
import { MzItemTypeEnum } from "../@enum/common.enum";
export interface MzPackControllerInterface {
    preAddItem(pack: MzPackInterface, id: string, item: any): Promise<void>;
    canAddItem(pack: MzPackInterface, id: string, item: any): Promise<boolean>;
    postAddItem(pack: MzPackInterface, id: string, item: any): Promise<void>;
    canChangeItem(pack: MzPackInterface, id: string, item: any): Promise<boolean>;
    preChangeItem(pack: MzPackInterface, id: string, item: any): Promise<void>;
    postChangeItem(pack: MzPackInterface, id: string, item: any): Promise<void>;
    canRemoveItem(pack: MzPackInterface, id: string): Promise<boolean>;
    preRemoveItem(pack: MzPackInterface, id: string): Promise<void>;
    postRemoveItem(pack: MzPackInterface, id: string): Promise<void>;
    canChangeState(pack: MzPackInterface, state: MzState): Promise<boolean>;
    preChangeState(pack: MzPackInterface, state: MzState): Promise<void>;
    postChangeState(pack: MzPackInterface, state: MzState): Promise<void>;
    canWriteItem(pack: MzPackInterface, id: string, item: any, typeChage: MzItemTypeEnum): Promise<boolean>;
    preWriteItem(pack: MzPackInterface, id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>;
    postWriteItem(pack: MzPackInterface, id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>;
}
export interface MzPackerInterface extends MzPackControllerInterface {
    storage: any;
    addPack(...pack: MzPackInterface[]): void;
    onAddItem$: Observable<MzInputOnChangeItem>;
    addItem(id: string, item: any, packId?: string, consistently?: boolean, callback?: (packId: string, state: MzState, id: string, item: any) => void): Promise<void>;
    onChangeItem$: Observable<MzInputOnChangeItem>;
    changeItem(id: string, item: any, packId?: string, consistently?: boolean): Promise<void>;
    onWriteItem$: Observable<MzInputOnChangeItem>;
    writeItem(id: string, item: any, typeChage: MzItemTypeEnum, packId?: string, consistently?: boolean, callback?: (packId: string, state: MzState, id: string, item: any) => void): Promise<void>;
    onRemoveItem$: Observable<MzInputOnChangeItem>;
    removeItem(id: string, item?: any, packId?: string, consistently?: boolean): Promise<void>;
    onChangeState$: Observable<MzInputOnChangeState>;
    changeState(newState: string, packId: string, consistently?: boolean): Promise<void>;
}
