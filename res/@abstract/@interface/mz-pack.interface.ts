import {MzInputAction, MzInputWrite, MzState} from "../@type/common.type";
import {Observable} from "rxjs";
import {MzItemTypeEnum} from "../@enum/common.enum";

export interface MzPackInterface {
    id: string
    storage: any

    state?: any

    //@< BLOCK FOR WRITE
        onWriteItem$: Observable<MzInputWrite>;
        onBindedWriteItem$: Observable<MzInputWrite>;

        canWriteItem (id: string, item: any, typeChage: MzItemTypeEnum): Promise<boolean>
        preWriteItem (id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>
        writeItem (id: string, item: any, typeChage: MzItemTypeEnum, callback?: (state: MzState, id: string, item: any) => void): Promise<void>
        postWriteItem (id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>
    //@< BLOCK FOR WRITE

    //@< BLOCK FOR ADD
        onAddItem$: Observable<MzInputAction>;
        onBindedAddItem$: Observable<MzInputAction>;

        canAddItem (id: string, item: any): Promise<boolean>
        preAddItem (id: string, item: any): Promise<void>
        addItem (id: string, item: any, callback?: (state: MzState, id: string, item: any) => void): Promise<void>
        postAddItem (id: string, item: any): Promise<void>
    //@> BLOCK FOR ADD

    //@< BLOCK FOR REMOVE
        onRemoveItem$: Observable<MzInputAction>;
        onBindedRemoveItem$: Observable<MzInputAction>;

        canRemoveItem (id: string, item: any): Promise<boolean>
        preRemoveItem (id: string, item: any): Promise<void>
        removeItem (id: string, item: any): Promise<void>
        postRemoveItem (id: string, item: any): Promise<void>
    //@> BLOCK FOR REMOVE

    //@< BLOCK FOR CHANGE ITEM
        onChangeItem$: Observable<MzInputAction>;
        onBindedChangeItem$: Observable<MzInputAction>;

        canChangeItem (id: string, item: any): Promise<boolean>
        preChangeItem (id: string, item: any): Promise<void>
        changeItem (id: string, item: any): Promise<void>
        postChangeItem (id: string, item: any): Promise<void>
    //@> BLOCK FOR EDIT

    //@< BLOCK FOR STATE CHANGING
        onChangeState$: Observable<MzInputAction>;
        onBindedChangeState$: Observable<MzInputAction>;

        canChangeState(state: MzState): Promise<boolean>
        preChangeState(state: MzState): Promise<void>
        changeState (state: MzState): Promise<void>
        postChangeState(state: MzState): Promise<void>
    //@> BLOCK FOR STATE CHANGING
}