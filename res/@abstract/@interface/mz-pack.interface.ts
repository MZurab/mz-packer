import {MzInputAction, MzInputWrite, MzState, MzInputOnChangeState, MzInputOnChangeItem} from "../@type/common.type";
import {Observable, Subject} from "rxjs";
import {MzItemTypeEnum} from "../@enum/common.enum";
import {MzPackerInterface} from "./mz-packer.interface";

export interface MzCustomPackInterface {
    
    //@< WRITE ITEM
        canWriteItem (id: string, item: any, typeChage: MzItemTypeEnum): Promise<boolean>
        preWriteItem (id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>
        postWriteItem (id: string, item: any, typeChage: MzItemTypeEnum): Promise<void>
    //@> WRITE ITEM
    
    //@< CHANGE ITEM
        canChangeItem (id: string, item: any): Promise<boolean>
        preChangeItem (id: string, item: any): Promise<void>
        postChangeItem (id: string, item: any): Promise<void>
    //@> CHANGE ITEM
    
    //@< REMOVE ITEM
        canRemoveItem (id: string, item?: any): Promise<boolean>
        preRemoveItem (id: string, item?: any): Promise<void>
        postRemoveItem (id: string, item?: any): Promise<void>
    //@> REMOVE ITEM
    
    //@< STATE CHANGE
        canChangeState(state: MzState): Promise<boolean>
        preChangeState(state: MzState): Promise<void>
        postChangeState(state: MzState): Promise<void>
    //@> STATE CHANGE   

    //@< ADD ITEM
        canAddItem (id: string, item: any): Promise<boolean>
        preAddItem (id: string, item: any): Promise<void>
        postAddItem (id: string, item: any): Promise<void>
    //@> ADD ITEM
}

export interface MzPackInterface extends MzCustomPackInterface{
    id: string
    storage: any

    state: string | null
    lastState: string | null
    allItems: {id: string, item: any}[]
    
    // conect to packer
    addPacker (...packer: MzPackerInterface[]): void


    getStateFromPack ( newState?: string): MzState

    //@< BLOCK FOR WRITE
        onWriteItem$: Subject<MzInputOnChangeItem>;
        onBindedWriteItem$: Subject<MzInputOnChangeItem>;
        
        // writeItem (id: string, item: any, typeChage: MzItemTypeEnum, callback?: (state: MzState, id: string, item: any) => void): Promise<void>

    //@< BLOCK FOR WRITE

    //@< BLOCK FOR ADD
        onAddItem$: Subject<MzInputOnChangeItem>;
        onBindedAddItem$: Subject<MzInputOnChangeItem>;
        
        addItem (id: string, item: any, callback?: (state: MzState, id: string, item: any) => void): Promise<void>

    //@> BLOCK FOR ADD

    //@< BLOCK FOR REMOVE
        onRemoveItem$: Subject<MzInputOnChangeItem>;
        onBindedRemoveItem$: Subject<MzInputOnChangeItem>;

        removeItem (id: string, item?: any): Promise<void>
    //@> BLOCK FOR REMOVE

    //@< BLOCK FOR CHANGE ITEM
        onChangeItem$: Subject<MzInputOnChangeItem>;
        onBindedChangeItem$: Subject<MzInputOnChangeItem>;

        changeItem (id: string, item: any): Promise<void>
    //@> BLOCK FOR EDIT

    //@< BLOCK FOR STATE CHANGING
        onChangeState$: Subject<MzInputOnChangeState>;
        onBindedChangeState$: Subject<MzInputOnChangeState>;

        changeState (state: MzState): Promise<void>
    //@> BLOCK FOR STATE CHANGING
}