import {
    MzInputAction,
    MzInputWrite,
    MzState,
    MzInputOnChangeState,
    MzInputOnChangeItem,
    MzInputOnEmitType
} from "../@type/common.type";
import {Observable, Subject} from "rxjs";
import {MzItemTypeEnum} from "../@enum/common.enum";
import {MzPackerInterface} from "./mz-packer.interface";

export interface MzCustomPackInterface {
    
    //@< WRITE ITEM
        canWriteItem (id: string, item: any, typeChage: MzItemTypeEnum, packId: string): Promise<boolean>
        preWriteItem (id: string, item: any, typeChage: MzItemTypeEnum, packId: string): Promise<void>
        postWriteItem (id: string, item: any, typeChage: MzItemTypeEnum, packId: string): Promise<void>
    //@> WRITE ITEM
    
    //@< CHANGE ITEM
        canChangeItem (id: string, item: any, packId: string): Promise<boolean>
        preChangeItem (id: string, item: any, packId: string): Promise<void>
        postChangeItem (id: string, item: any, packId: string): Promise<void>
    //@> CHANGE ITEM
    
    //@< REMOVE ITEM
        canRemoveItem (id: string, packId: string, item?: any): Promise<boolean>
        preRemoveItem (id: string, packId: string, item?: any): Promise<void>
        postRemoveItem (id: string, packId: string, item?: any): Promise<void>
    //@> REMOVE ITEM
    
    //@< STATE CHANGE
        canChangeState(state: MzState, packId: string): Promise<boolean>
        preChangeState(state: MzState, packId: string): Promise<void>
        postChangeState(state: MzState, packId: string): Promise<void>
    //@> STATE CHANGE   

    //@< ADD ITEM
        canAddItem (id: string, item: any, packId: string): Promise<boolean>
        preAddItem (id: string, item: any, packId: string): Promise<void>
        postAddItem (id: string, item: any, packId: string): Promise<void>
    //@> ADD ITEM

    //@< BLOCK FOR EMIT
        canEmit (data: any, packId?: string): Promise<boolean>
        preEmit (data: any, packId?: string): Promise<void>
        postEmit (data: any, packId?: string): Promise<void>
    //@> BLOCK FOR EMIT
}

export interface MzPackInterface extends MzCustomPackInterface{
    id: string
    storage: any

    state: string | null
    lastState: string | null
    allItems: {id: string, item: any}[]
    
    // conect to packer from pack (also we can pack from packer with 'addPack')
    addPacker (...packer: MzPackerInterface[]): void

    // get state with previous state
    getStateFromPack ( newState?: string): MzState

    //@< RETRANSLATOR
        // save my retranslators (for later emit)
        saveMyRetranslators (...packs: MzPackInterface[]): void
        // remove my retranslators
        removeMyRetranslators (...packs: MzPackInterface[]): void
        // retranslate to pack
        retranslateToPacks (...packs: MzPackInterface[]): void
        addPackForRetranslate (...packs: MzPackInterface[]): void
        removePackFromRetranslate (...packs: MzPackInterface[]): void
        clearPackForRetranslate  (): void
    //@> RETRANSLATOR


    //@< BLOCK FOR EMIT
        onEmit$: Subject<MzInputOnEmitType>;
        emit (data: any, packIds: string[], packId?: string): Promise<void>
    //@> BLOCK FOR EMIT

    //@< BLOCK FOR WRITE
        onWriteItem$: Subject<MzInputOnChangeItem>;
        // onBindedWriteItem$: Subject<MzInputOnChangeItem>;
        
        writeItem (id: string, item: any, typeChage: MzItemTypeEnum, packId: string,  callback?: (state: MzState, id: string, item: any) => void): Promise<void>

    //@< BLOCK FOR WRITE

    //@< BLOCK FOR ADD
        onAddItem$: Subject<MzInputOnChangeItem>;
        // onBindedAddItem$: Subject<MzInputOnChangeItem>;
        
        addItem (id: string, item: any, packId: string, callback?: (state: MzState, id: string, item: any) => void): Promise<void>

    //@> BLOCK FOR ADD

    //@< BLOCK FOR REMOVE
        onRemoveItem$: Subject<MzInputOnChangeItem>;
        // onBindedRemoveItem$: Subject<MzInputOnChangeItem>;

        removeItem (id: string, packId: string, item?: any): Promise<void>
    //@> BLOCK FOR REMOVE

    //@< BLOCK FOR CHANGE ITEM
        onChangeItem$: Subject<MzInputOnChangeItem>;
        // onBindedChangeItem$: Subject<MzInputOnChangeItem>;

        changeItem (id: string, packId: string, item: any): Promise<void>
    //@> BLOCK FOR EDIT

    //@< BLOCK FOR STATE CHANGING
        onChangeState$: Subject<MzInputOnChangeState>;
        // onBindedChangeState$: Subject<MzInputOnChangeState>;

        changeState (state: MzState, packId: string): Promise<void>
    //@> BLOCK FOR STATE CHANGING
}