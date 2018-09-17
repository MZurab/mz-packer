import {MzPackInterface} from "../@interface/mz-pack.interface";
import {Subject, Observable} from "rxjs";
import {MzState, MzInputOnChangeItem, MzInputOnEmitType} from "../@type/common.type";
import {MzItemTypeEnum} from "../@enum/common.enum";
import {MzPackerInterface} from "../@interface/mz-packer.interface";

export abstract class MzPackAbstractClass implements MzPackInterface{
    abstract id: string;
    abstract storage: any;
    
    public state: string | null = null;
    public lastState: string | null= null;
    public allItems: {id: string, item: any}[] = [];
    
    
    //@< RETRANSLATOR
        // packs for retranslator
        private packsForRetranslator: MzPackInterface[] = [];
        private myRetranslators: MzPackInterface[] = [];

        public saveMyRetranslators (...packs: MzPackInterface[]): void {
            for (let pack of packs) {
                this.myRetranslators.push(pack);
            }
            console.log('saveMyRetranslators',this.id, this.myRetranslators);
        }
        public removeMyRetranslators (...packs: MzPackInterface[]) {
            for (let pack of packs) {
                this.myRetranslators = this.myRetranslators.filter(
                    (p) => p.id !== pack.id
                )
            }
            console.log('removeMyRetranslators',this.id, this.myRetranslators);
        }

        public retranslateToPacks (...packs: MzPackInterface[]) {
            this.clearPackForRetranslate();
            this.addPackForRetranslate(...packs);
        }
        public addPackForRetranslate (...packs: MzPackInterface[]) {
            for (let pack of packs) {
                this.packsForRetranslator.push(pack);
                pack.saveMyRetranslators(this);
            }
        }

        public removePackFromRetranslate (...packs: MzPackInterface[]) {
            for (let pack of packs) {
                this.packsForRetranslator = this.packsForRetranslator.filter(
                    (p) => {
                        // remove my ref from this
                        p.removeMyRetranslators(this);
                        return p.id !== pack.id;
                    }
                )
            }
        }

        public clearPackForRetranslate  () {
            this.packsForRetranslator = [];
        }
    //@> RETRANSLATOR
    
    

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


    //@< EMIT BLOCK
        public readonly onEmit$: Subject<MzInputOnEmitType> = new Subject();

        async canEmit (data: any, packId?: string): Promise<boolean> {
            return true;
        }

        async emit(data: any, packIds: string[] = [], packId: string = this.id): Promise<void> {
            if ( await this.canEmit(packIds, packId) ) {
                // invoke pre
                await this.preEmit(data, packId);

                // send to my retranslators
                console.log('this.myRetranslators emit - ', this.myRetranslators);
                this.myRetranslators.forEach(
                    (pack) => {
                        console.log('this.myRetranslators pack.id - ', pack.id);
                        if(
                            Array.isArray(packIds) &&
                            packIds.length > 0
                        ) { // if we get difined packIds send only to them
                            if (packIds.indexOf(pack.id) !== -1)
                                pack.emit(data, packIds, packId);

                        } else { // if we don't get difined packIds send to all my retranslators
                            pack.emit(data, packIds, packId);
                        }
                    }
                );

                // emit actions
                this.onEmit$.next(
                    {
                        packId: this.id,
                        state: this.getStateFromPack(),
                        storage: this.storage,
                        data: data
                    }
                );

                // invoke post action
                await this.postEmit(data, packId);
            }
        }

        async preEmit (data: any, packId?: string): Promise<void> {
            //...
        }

        async postEmit (data: any, packId?: string): Promise<void> {
            //...
        }
    //@< EMIT BLOCK

    //@< ADD ITEM
        public readonly onAddItem$: Subject<MzInputOnChangeItem> = new Subject();
        // onBindedAddItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canAddItem(id: string, item: any, packId: string = this.id ): Promise<boolean> {
            return this.canWriteItem(id, item, MzItemTypeEnum.add, packId);
        }

        async preAddItem(id: string, item: any, packId: string = this.id ): Promise<void> {
        }

        async addItem(id: string, item: any, packId: string = this.id, callback?: (state: MzState, id: string, item: any) => void): Promise<void> {
            if ( await this.canAddItem(id, item, packId) ) {
                // invoke pre
                await this.preAddItem(id, item, packId);

                // retranslator
                this.packsForRetranslator.forEach(
                    (pack) => {
                        pack.addItem(id, item, packId, callback)
                    }
                );

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
                );
                
                // invoke post action
                await this.postAddItem(id, item, packId);
            }
        }

        async postAddItem(id: string, item: any, packId: string = this.id): Promise<void> {
        }
    //@> ADD ITEM

    //@< REMOVE ITEM
        public readonly onRemoveItem$: Subject<MzInputOnChangeItem> = new Subject();
        // onBindedRemoveItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canRemoveItem(id: string, packId: string = this.id, item?: any): Promise<boolean> {
            return this.canWriteItem(id, item, MzItemTypeEnum.remove, packId);
        }

        async preRemoveItem(id: string, packId: string = this.id, item?: any): Promise<void> {
            //...
        }

        async removeItem (id: string, packId: string = this.id, item?: any): Promise<void> {
            if ( await this.canRemoveItem(id, packId, item) ) {
                // invoke pre
                await this.preRemoveItem(id, packId, item);

                // retranslator
                this.packsForRetranslator.forEach(
                    (pack) => {
                        pack.removeItem(id, packId, item)
                    }
                )
                
                // if (packId === this.id) {
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
                // }
                
                // invoke post action
                await this.postRemoveItem(id, packId, item);
            }
        }

        async postRemoveItem(id: string, packId: string = this.id, item?: any): Promise<void> {
            //...
        }
    //@> REMOVE ITEM

    //@< CHANGE ITEM
        public readonly onChangeItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canChangeItem (id: string, item: any, packId: string = this.id): Promise<boolean> {
            return this.canWriteItem(id, item, MzItemTypeEnum.change, packId);
        }

        async preChangeItem(id: string, item: any, packId: string = this.id): Promise<void> {
            //...
        }

        async changeItem (id: string, item: any, packId: string = this.id): Promise<void> {
            // find items with this id ->  change
            let itemIndex = this.allItems.findIndex(
                (item) => item.id === id
            );
            
            if ( await this.canChangeItem(id, item, packId) && itemIndex !== -1 ) {
                // invoke pre
                await this.preChangeItem(id, item, packId);

                // retranslator
                this.packsForRetranslator.forEach(
                    (pack) => {
                        pack.changeItem(id, item, packId)
                    }
                )
                
                // if (packId === this.id) {
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
                // }
                

                // invoke post action
                await this.postChangeItem(id, item, packId = this.id);
            }
        }

        async postChangeItem(id: string, item: any, packId: string = this.id): Promise<void> {
            //...
        }
    //@> CHANGE ITEM


    //@< WRITE ITEM
        public readonly onWriteItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canWriteItem (id: string, item: any, typeChage: MzItemTypeEnum, packId: string = this.id): Promise<boolean> {
            return true;
        }

        async preWriteItem(id: string, item: any, typeChage: MzItemTypeEnum, packId: string = this.id): Promise<void> {
            //...
        }

        async writeItem (
            id: string,
            item: any,
            typeChage: MzItemTypeEnum, 
            packId: string = this.id
        ): Promise<void> {
            if ( await this.canWriteItem(id, item, typeChage, packId) ) {
                // invoke pre
                await this.preWriteItem(id, item, typeChage, packId);


                // retranslator
                this.packsForRetranslator.forEach(
                    (pack) => {
                        pack.writeItem(id, item, typeChage, packId)
                    }
                )
                
                // if ( this.id === packId) {
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
                // }

                // invoke post action
                await this.postWriteItem(id, item, typeChage, packId);
            }
        }

        async postWriteItem(id: string, item: any, typeChage: MzItemTypeEnum, packId: string = this.id): Promise<void> {
            //...
        }
    //@> WRITE ITEM

    //@< CHANGE STATE
        public readonly onChangeState$ = Observable.create();

        async canChangeState (state: MzState, packId: string = this.id): Promise<boolean> {
            return true;
        }

        async preChangeState (state: MzState, packId: string = this.id): Promise<void> {
            //...
        }

        async changeState (state: MzState, packId: string = this.id): Promise<void> {
            if ( await this.canChangeState(state, packId) ) {
                // invoke pre
                await this.preChangeState(state, packId);


                // retranslate
                this.packsForRetranslator.forEach(
                    (pack) => {
                        pack.changeState(state, packId);
                    }
                );

                // set state current and previous
                this.state = state.current;
                this.lastState = state.previous

                // invoke post action
                await this.postChangeState(state, packId);
            }
        }

        async postChangeState(state: MzState, packId: string = this.id): Promise<void> {
            //...
        }
    //@> CHANGE STATE

}