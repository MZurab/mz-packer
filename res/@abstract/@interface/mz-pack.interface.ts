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

        canWrite (id: string, item: any, typeChage: MzItemTypeEnum): Promise<boolean>
        preWrite (id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>
        write (id: string, item: any, typeChage: MzItemTypeEnum, callback?: (state: MzState, id: string, item: any) => void): Promise<void>
        postWrite (id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>
    //@< BLOCK FOR WRITE

    //@< BLOCK FOR ADD
        onAddItem$: Observable<MzInputAction>;
        onBindedAddItem$: Observable<MzInputAction>;

        canAdd (id: string, item: any): Promise<boolean>
        preAdd (id: string, item: any): Promise<void>
        add (id: string, item: any, callback?: (state: MzState, id: string, item: any) => void): Promise<void>
        postAdd (id: string, item: any): Promise<void>
    //@> BLOCK FOR ADD

    //@< BLOCK FOR REMOVE
        onRemoveItem$: Observable<MzInputAction>;
        onBindedRemoveItem$: Observable<MzInputAction>;

        canRemove (id: string, item: any): Promise<boolean>
        preRemove (id: string, item: any): Promise<void>
        remove (id: string, item: any, callback?: (state: MzState, id: string, item: any) => void): Promise<void>
        postRemove (id: string, item: any): Promise<void>
    //@> BLOCK FOR REMOVE

    //@< BLOCK FOR CHANGE ITEM
        onChangeItem$: Observable<MzInputAction>;
        onBindedChangeItem$: Observable<MzInputAction>;

        canChange (id: string, item: any): Promise<boolean>
        preChange (id: string, item: any): Promise<void>
        change (id: string, item: any, callback?: (state: MzState, id: string, item: any) => void): Promise<void>
        postChange (id: string, item: any): Promise<void>
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