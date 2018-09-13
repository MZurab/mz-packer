import {MzPackInterface} from "../@interface/mz-pack.interface";
import {Subject, Observable} from "rxjs";
import {MzState} from "../@type/common.type";
import {MzItemTypeEnum} from "../@enum/common.enum";

export abstract class MzPackAbstractClass implements MzPackInterface{
    abstract id: string;
    abstract storage: any;
    protected state: any = null;

    //@< ADD ITEM
        onAddItem$ = Observable.create();
        onBindedAddItem$ = Observable.create();

        async canAddItem(id: string, item: any): Promise<boolean> {
            return this.canWriteItem(id, item, MzItemTypeEnum.add);
        }

        async preAddItem(id: string, item: any): Promise<void> {
        }

        async addItem(id: string, item: any, callback?: (state: MzState, id: string, item: any) => void): Promise<void> {
        }

        async postAddItem(id: string, item: any): Promise<void> {
        }
    //@> ADD ITEM

    //@< REMOVE ITEM
        onRemoveItem$ = Observable.create();
        onBindedRemoveItem$ = Observable.create(); //: <MzInputAction>;

        async canRemoveItem(id: string, item: any): Promise<boolean> {
            return this.canWriteItem(id, item, MzItemTypeEnum.remove);
        }

        async preRemoveItem(id: string, item: any): Promise<void> {
        }

        abstract async removeItem(id: string, item: any): Promise<void>

        async postRemoveItem(id: string, item: any): Promise<void> {
        }
    //@> REMOVE ITEM

    //@< CHANGE ITEM
        onChangeItem$ = Observable.create();
        onBindedChangeItem$ = Observable.create(); // : <MzInputAction>

        async canChangeItem (id: string, item: any): Promise<boolean> {
            return this.canWriteItem(id, item, MzItemTypeEnum.change);
        }

        async preChangeItem(id: string, item: any): Promise<void> {
            //...
        }

        abstract async changeItem(id: string, item: any): Promise<void>

        async postChangeItem(id: string, item: any): Promise<void> {
            //...
        }
    //@> CHANGE ITEM


    //@< WRITE ITEM
        onWriteItem$ = Observable.create();
        onBindedWriteItem$ = Observable.create(); // : <MzInputAction>

        async canWriteItem (id: string, item: any, typeChage: MzItemTypeEnum): Promise<boolean> {
            return true;
        }

        async preWriteItem(id: string, item: any, typeChage: MzItemTypeEnum): Promise<void> {
            //...
        }

        abstract async writeItem (id: string, item: any, typeChage: MzItemTypeEnum, callback?: (state: MzState, id: string, item: any) => void): Promise<void>

        async postWriteItem(id: string, item: any, typeChage: MzItemTypeEnum): Promise<void> {
            //...
        }
    //@> WRITE ITEM

    //@< CHANGE STATE
        onChangeState$ = Observable.create();
        onBindedChangeState$ = Observable.create(); // : <MzInputAction>

        async canChangeState (state: MzState): Promise<boolean> {
            return true;
        }

        protected async preChangeState (state: MzState): Promise<void> {
            //...
        }

        abstract async changeState (state: MzState): Promise<void>

        async postChangeState(state: MzState): Promise<void> {
            //...
        }
    //@> CHANGE STATE

}