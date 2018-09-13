import { MzPackInterface } from "./mz-pack.interface";
import { MzState, MzInputOnChangeItem, MzInputOnChangeState } from "../@type/common.type";
import { Subject } from "rxjs";
export interface MzPackControllerInterface {
    preAddItem(pack: MzPackInterface, id: string, item: any): Promise<void>;
    canAddItem(pack: MzPackInterface, id: string, item: any): Promise<boolean>;
    postAddItem(pack: MzPackInterface, id: string, item: any): Promise<void>;
    canChangeItem(pack: MzPackInterface, id: string, state: MzState): Promise<boolean>;
    preChangeItem(pack: MzPackInterface, id: string, consistently?: boolean): Promise<void>;
    postChangeItem(pack: MzPackInterface, id: string, consistently?: boolean): Promise<void>;
    canRemoveItem(pack: MzPackInterface, id: string, state: MzState): Promise<boolean>;
    preRemoveItem(pack: MzPackInterface, id: string, consistently?: boolean): Promise<void>;
    postRemoveItem(pack: MzPackInterface, id: string, consistently?: boolean): Promise<void>;
    canChangeState(pack: MzPackInterface, state: MzState): Promise<boolean>;
    preChangeState(pack: MzPackInterface, state: MzState): Promise<void>;
    postChangeState(pack: MzPackInterface, state: MzState): Promise<void>;
}
export interface MzPackerInterface extends MzPackControllerInterface {
    storage: any;
    addPack(...pack: MzPackInterface[]): void;
    onAddItem$: Subject<MzInputOnChangeItem>;
    addItem(id: string, item: any, packId?: string, consistently?: boolean, callback?: (packId: string, state: MzState, id: string, item: any) => void): Promise<void>;
    onChangeItem$: Subject<MzInputOnChangeItem>;
    changeItem(id: string, packId?: string, item?: any, consistently?: boolean): Promise<void>;
    onRemoveItem$: Subject<MzInputOnChangeItem>;
    removeItem(id: string, packId?: string, item?: any, consistently?: boolean): Promise<void>;
    onChangeState$: Subject<MzInputOnChangeState>;
    changeState(newState: string, packId: string, consistently?: boolean): Promise<void>;
}
