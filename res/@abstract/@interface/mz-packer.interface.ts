import {MzPackInterface} from "./mz-pack.interface";
import {MzState, MzInputOnAddItem, MzInputOnChangeItem, MzInputOnChangeState} from "../@type/common.type";
import {Observable} from "rxjs";
import {MzItemTypeEnum} from "../@enum/common.enum";

export interface MzPackControllerInterface {
    //@< BLOCK FOR ADD ITEM
        preAddItem (
            pack: MzPackInterface,
            id: string,
            item: any
        ): Promise<void>

        canAddItem (
            pack: MzPackInterface,
            id: string,
            item: any
        ): Promise<boolean>

        postAddItem (
            pack: MzPackInterface,
            id: string,
            item: any
        ): Promise<void>
    //@> BLOCK FOR ADD ITEM

    //@< BLOCK FOR CHANGE ITEM
        canChangeItem (
            pack: MzPackInterface,
            id: string,
            item: any
        ): Promise<boolean>

        preChangeItem (
            pack: MzPackInterface,
            id: string,
            item: any
        ): Promise<void>

        postChangeItem (
            pack: MzPackInterface,
            id: string,
            item: any
        ): Promise<void>
    //@> BLOCK FOR CHANGE ITEM

    //@< BLOCK FOR REMOVE ITEM
        canRemoveItem (
            pack: MzPackInterface,
            id: string
        ): Promise<boolean>

        preRemoveItem (
            pack: MzPackInterface,
            id: string
        ): Promise<void>

        postRemoveItem (
            pack: MzPackInterface,
            id: string
        ): Promise<void>
    //@> BLOCK FOR REMOVE ITEM

    //@< BLOCK FOR CHANGE STATE
        canChangeState (
            pack: MzPackInterface, 
            state: MzState
        ): Promise<boolean>

        preChangeState (
            pack: MzPackInterface, 
            state: MzState
        ): Promise<void>

        postChangeState (
            pack: MzPackInterface, 
            state: MzState
        ): Promise<void>
    //@> BLOCK FOR CHANGE STATE

    //@< BLOCK FOR WRITE ITEM
        canWriteItem (
            pack: MzPackInterface,
            id: string,
            item: any,
            typeChage: MzItemTypeEnum
        ): Promise<boolean>
    
        preWriteItem (
            pack: MzPackInterface,
            id: string,
            item: any,
            typeChage: MzItemTypeEnum
        ): Promise<void>
    
        postWriteItem (
            pack: MzPackInterface,
            id: string,
            item: any,
            typeChage: MzItemTypeEnum
        ): Promise<void>
    //@> BLOCK FOR WRITE ITEM - 
}

export interface MzPackerInterface extends MzPackControllerInterface {
    storage: any,

    addPack(...pack: MzPackInterface[]): void

    //@< BLOCK FOR ADD ITEM
        onAddItem$: Observable<MzInputOnChangeItem>

        addItem (
            id: string,
            item: any,
            packId?: string,
            consistently?: boolean,
            callback?: (packId: string, state: MzState, id: string, item: any) => void
        ): Promise<void>
    //@> BLOCK FOR ADD ITEM

    //@< BLOCK FOR CHANGE ITEM
        onChangeItem$: Observable<MzInputOnChangeItem>
    
        changeItem (
            id: string,
            item: any,
            packId?: string,
            consistently?: boolean
        ): Promise<void>

    //@> BLOCK FOR CHANGE ITEM

    //@< BLOCK FOR WRITE ITEM
        onWriteItem$: Observable<MzInputOnChangeItem>
    
        writeItem (
            id: string,
            item: any,
            typeChage: MzItemTypeEnum,
            packId?: string,
            consistently?: boolean,
            callback?: (packId: string, state: MzState, id: string, item: any) => void
        ): Promise<void>

    //@> BLOCK FOR WRITE ITEM
    
    //@< BLOCK FOR REMOVE ITEM
        onRemoveItem$: Observable<MzInputOnChangeItem>

        removeItem (
            id: string,
            item?: any,
            packId?: string,
            consistently?: boolean
        ): Promise<void>
    //@> BLOCK FOR REMOVE ITEM

    //@< BLOCK FOR CHANGE STATE
        onChangeState$: Observable<MzInputOnChangeState>;
    
        changeState (
            newState: string, 
            packId: string, 
            consistently?: boolean
        ): Promise<void>
    //@> BLOCK FOR CHANGE STATE
}