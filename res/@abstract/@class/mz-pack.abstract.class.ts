import {MzPackInterface} from "../@interface/mz-pack.interface";
import {Subject, Observable} from "rxjs";
import {MzState, MzInputOnChangeItem} from "../@type/common.type";
import {MzItemTypeEnum} from "../@enum/common.enum";
import {MzPackerInterface} from "../@interface/mz-packer.interface";

export abstract class MzPackAbstractClass implements MzPackInterface{
    abstract id: string;
    abstract storage: any;
    
    public state: string | null = null;
    public lastState: string | null= null;
    public allItems: {id: string, item: any}[] = []

    // add packer
    public addPacker (...packers: MzPackerInterface[]): void {
        for (let packer of packers) {
            let _this: any = this;
            packer.addPack(_this)
        } 
    }

    public getStateFromPack ( newState?: string): MzState  {
        return {
            current: (newState) ? newState : this.state,
            previous: (newState) ? this.state : this.lastState
        }
    }


    //@< ADD ITEM
        onAddItem$: Subject<MzInputOnChangeItem> = new Subject();
        onBindedAddItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canAddItem(id: string, item: any): Promise<boolean> {
            return this.canWriteItem(id, item, MzItemTypeEnum.add);
        }

        async preAddItem(id: string, item: any): Promise<void> {
        }

        async addItem(id: string, item: any, callback?: (state: MzState, id: string, item: any) => void): Promise<void> {
            if ( await this.canAddItem(id, item) ) {
                // invoke pre
                await this.preAddItem(id, item);

                // delete items with this id
                this.allItems.push({id, item});
                
                // emit actions
                this.onAddItem$.next(
                    {
                        packId: this.id,
                        state: this.getStateFromPack(),
                        storage: this.storage,
                        item: item,
                        id: id,
                        type: MzItemTypeEnum.add
                    }
                )

                // invoke post action
                await this.postAddItem(id, item);
            }
        }

        async postAddItem(id: string, item: any): Promise<void> {
        }
    //@> ADD ITEM

    //@< REMOVE ITEM
        onRemoveItem$: Subject<MzInputOnChangeItem> = new Subject();
        onBindedRemoveItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canRemoveItem(id: string, item?: any): Promise<boolean> {
            return this.canWriteItem(id, item, MzItemTypeEnum.remove);
        }

        async preRemoveItem(id: string, item?: any): Promise<void> {
            //...
        }

        async removeItem (id: string, item?: any): Promise<void> {
            if ( await this.canRemoveItem(id, item) ) {
                // invoke pre
                await this.preRemoveItem(id, item);

                // delete items with this id
                this.allItems = this.allItems.filter(
                    (item) => item.id !== id
                );

                // emit
                this.onRemoveItem$.next (
                    {
                        packId: this.id,
                        state: this.getStateFromPack(),
                        storage: this.storage,
                        item: item,
                        id: id,
                        type: MzItemTypeEnum.remove
                    }
                )
                
                // invoke post action
                await this.postRemoveItem(id, item);
            }
        }

        async postRemoveItem(id: string, item: any): Promise<void> {
            //...
        }
    //@> REMOVE ITEM

    //@< CHANGE ITEM
        onChangeItem$: Subject<MzInputOnChangeItem> = new Subject();
        onBindedChangeItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canChangeItem (id: string, item: any): Promise<boolean> {
            return this.canWriteItem(id, item, MzItemTypeEnum.change);
        }

        async preChangeItem(id: string, item: any): Promise<void> {
            //...
        }

        async changeItem (id: string, item: any): Promise<void> {
            
            // find items with this id ->  change
            let itemIndex = this.allItems.findIndex(
                (item) => item.id === id
            );
            
            if ( await this.canChangeItem(id, item) && itemIndex !== -1 ) {
                // invoke pre
                await this.preChangeItem(id, item);

                // update
                this.allItems[itemIndex] = {id,item};

                // emit
                this.onChangeItem$.next (
                    {
                        packId: this.id,
                        state: this.getStateFromPack(),
                        storage: this.storage,
                        item: item,
                        id: id,
                        type: MzItemTypeEnum.change
                    }
                )

                // invoke post action
                await this.postChangeItem(id, item);
            }
        }

        async postChangeItem(id: string, item: any): Promise<void> {
            //...
        }
    //@> CHANGE ITEM


    //@< WRITE ITEM
        onWriteItem$: Subject<MzInputOnChangeItem> = new Subject();
        onBindedWriteItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canWriteItem (id: string, item: any, typeChage: MzItemTypeEnum): Promise<boolean> {
            return true;
        }

        async preWriteItem(id: string, item: any, typeChage: MzItemTypeEnum): Promise<void> {
            //...
        }

        async writeItem (
            id: string,
            item: any,
            typeChage: MzItemTypeEnum
        ): Promise<void> {
            if ( await this.canWriteItem(id, item, typeChage) ) {
                // invoke pre
                await this.preWriteItem(id, item, typeChage);

                // emit
                this.onWriteItem$.next (
                    {
                        packId: this.id,
                        state: this.getStateFromPack(),
                        storage: this.storage,
                        item: item,
                        id: id,
                        type: typeChage
                    }
                )

                // invoke post action
                await this.postWriteItem(id, item, typeChage);
            }
        }

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

        async preChangeState (state: MzState): Promise<void> {
            //...
        }

        async changeState (state: MzState): Promise<void> {
            if ( await this.canChangeState(state) ) {
                // invoke pre
                await this.preChangeState(state);

                // set state current and previous
                this.state = state.current;
                this.lastState = state.previous

                // invoke post action
                await this.postChangeState(state);
            }
        }

        async postChangeState(state: MzState): Promise<void> {
            //...
        }
    //@> CHANGE STATE

}