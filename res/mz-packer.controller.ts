import {Subject, Subscription, merge, Observable} from "rxjs";

import {MzPackerInterface} from "./@abstract/@interface/mz-packer.interface";
import {
    MzInputOnChangeItem,
    MzInputOnChangeState,
    MzInputOnChangeStorage, MzState,
    MzStorageOfPacksType,
    MzSubscriptionsOfPackerType
} from "./@abstract/@type/common.type";
import {MzPackInterface} from "./@abstract/@interface/mz-pack.interface";
import {MzItemTypeEnum} from "./@abstract/@enum/common.enum";

export class MzPacker implements MzPackerInterface {
    public storage: any = {};
    public storageOfPacks: MzStorageOfPacksType = {};
    public subscriptions: MzSubscriptionsOfPackerType = {
        onAddItem       : [],
        onWriteItem     : [],
        onChangeItem    : [],
        onRemoveItem    : [],
        onChangeState   : [],
    };

    private subscriptionsOnChangeState$: Subscription[] = [];

    public onChangeStorage$: Subject<MzInputOnChangeStorage> = new Subject();

    private getAllPacksOrPackByPackId (packId?: string): (MzPackInterface | null)[] {
        let packs = [];
        if (packId) {
            let pack = this.getPackClassFromStorageOfPacks(packId);
            packs.push(pack);
        } else {
            packs = this.getAllPackClassFromStorageOfPacks()
        }

        return packs;
    }


    //@< CHANGE ITEM
        // @ts-ignore
        public onChangeItem$: Observable<MzInputOnChangeItem>;

        async canChangeItem (pack: MzPackInterface, id: string, item: any): Promise<boolean> {
            return  pack.canChangeItem(id, item, pack.id);
        }
        
        async preChangeItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.preChangeItem(id, item, pack.id);
        }

        async postChangeItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.postChangeItem(id, item, pack.id);
        }

        public async changeItem (
            id: string,
            item: any,
            packId?: string,
            consistently: boolean = false
        ): Promise<void> {
            let packs = this.getAllPacksOrPackByPackId(packId);
            for (let pack of packs) {
                //@guard - we have pack
                if (!pack) break;

                if (consistently)
                    await pack.changeItem(id, item, pack.id);
                else
                    pack.changeItem(id, item, pack.id);
            }
        }
    //@> CHANGE ITEM

    //@< REMOVE ITEM
        // @ts-ignore
        public onRemoveItem$: Observable<MzInputOnChangeItem>;

        async canRemoveItem (pack: MzPackInterface, id: string, item?: any): Promise<boolean> {
            return  pack.canRemoveItem(id, item, pack.id );
        }

        async preRemoveItem (pack: MzPackInterface, id: string, item?: any): Promise<void> {
            return pack.preRemoveItem(id, item, pack.id);
        }

        async postRemoveItem (pack: MzPackInterface, id: string, item?: any): Promise<void> {
            return pack.postRemoveItem(id, item, pack.id);
        }
        
        public async removeItem (
            id: string,
            item?: any,
            packId?: string,
            consistently: boolean = false
        ): Promise<void> {
            let packs = this.getAllPacksOrPackByPackId(packId);
            for (let pack of packs) {
                //@guard - we have pack
                if (!pack) break;
    
                if (consistently)
                    await pack.removeItem(id, item, pack.id);
                else
                    pack.removeItem(id, item, pack.id);
            }
        }
    //@> REMOVE ITEM

    //@< ADD ITEM
        // @ts-ignore
        public onAddItem$: Observable<MzInputOnChangeItem>;

        async canAddItem (pack: MzPackInterface, id: string, item: any): Promise<boolean> {
            return  pack.canAddItem(id, item, pack.id,);
        }

        async preAddItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.preAddItem(id, item, pack.id,);
        }

        async postAddItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.postAddItem(id, item, pack.id,);
        }

        public async addItem (
            id: string,
            item: any,
            packId?: string,
            consistently: boolean = false,
            callback?: (packId: string, state: MzState, id: string, item: any) => void
        ): Promise<void> {
            let packs = this.getAllPacksOrPackByPackId(packId);
            for (let pack of packs) {
                //@guard - we have pack
                if (!pack) break;

                if (consistently)
                    await // add to pack
                        pack.addItem(
                            id,
                            item, 
                            pack.id,
                            (state: MzState, id: string, item: any) => {
                                if(typeof callback === 'function' && packId) callback( packId, state, id, item)
                            }
                        );
                else
                // add to pack
                    pack.addItem(
                        id,
                        item, 
                        pack.id,
                        (state: MzState, id: string, item: any) => {
                            if(typeof callback === 'function' && packId) callback( packId, state, id, item)
                        }
                    );
            }
        }
    //@> ADD ITEM

    //@< WRITE ITEM
        // @ts-ignore
        public onWriteItem$: Observable<MzInputOnChangeItem>;

        async canWriteItem (
            pack: MzPackInterface,
            id: string,
            item: any,
            typeChage: MzItemTypeEnum,
        ): Promise<boolean> {
            return  pack.canWriteItem(id, item, typeChage, pack.id);
        }

        async preWriteItem (
            pack: MzPackInterface,
            id: string,
            item: any,
            typeChage: MzItemTypeEnum,
        ): Promise<void> {
            return pack.preWriteItem(id, item, typeChage, pack.id);
        }

        async postWriteItem (
            pack: MzPackInterface,
            id: string,
            item: any,
            typeChage: MzItemTypeEnum,
        ): Promise<void> {
            return pack.postWriteItem(id, item, typeChage, pack.id);
        }

        public async writeItem (
            id: string,
            item: any,
            typeChage: MzItemTypeEnum,
            packId?: string,
            consistently: boolean = false,
            callback?: (packId: string, state: MzState, id: string, item: any) => void
        ): Promise<void> {
            let packs = this.getAllPacksOrPackByPackId(packId);
            for (let pack of packs) {
                //@guard - we have pack
                if (!pack) break;

                if (consistently)
                    await // add to pack
                        pack.writeItem(
                            id,
                            item,
                            typeChage,
                            pack.id,
                            (state: MzState, id: string, item: any) => {
                                if(typeof callback === 'function' && packId) callback( packId, state, id, item)
                            }
                        );
                else
                    // add to pack
                    pack.writeItem(
                        id,
                        item,
                        typeChage,
                        pack.id,
                        (state: MzState, id: string, item: any) => {
                            if(typeof callback === 'function' && packId) callback( packId, state, id, item)
                        }
                    );
            }
        }
    //@> WRITE ITEM

    //@< STATE CHANGING
        // @ts-ignore
        public onChangeState$: Observable<MzInputOnChangeState>;

        private getStateFromPack (pack: MzPackInterface, newState?: string): MzState  {
            return pack.getStateFromPack(newState);
        }

        private async changeStateByPack (pack: MzPackInterface, state: MzState) {
            if ( await this.canChangeState(pack, state) ) {
                await this.preChangeState(pack, state);
                await pack.changeState(state, pack.id);
                await this.postChangeState(pack, state);
            }
        }

        async canChangeState (pack: MzPackInterface, state: MzState): Promise<boolean> {
            return await pack.canChangeState(state, pack.id);
        }

        async preChangeState (pack: MzPackInterface, state: MzState): Promise<void> {
            pack.preChangeState(state, pack.id);
        }

        async postChangeState (pack: MzPackInterface, state: MzState): Promise<void> {
            pack.postChangeState(state, pack.id);
        }

        public async changeState (newState: string, packId: string, consistently: boolean = false): Promise<void> {
            let packs = this.getAllPacksOrPackByPackId(packId);
            for (let pack of packs) {
                //@guard - we have pack
                if (!pack) break;

                // get state in right format with previous state
                let state = this.getStateFromPack(pack, newState);

                if (consistently)
                    await this.changeStateByPack(pack, state);
                else
                    this.changeStateByPack(pack, state);
            }
        }
    //@> STATE CHANGING

    

    public addPack (...packs: MzPackInterface[]): void {
        if (!Array.isArray(packs) || packs.length === 0) return;
        for (let pack of packs) {
            this.addStorageOfPack(pack);

            this.addPackToLocalStorageOfPacks(pack);
        }
    }

    public addObserver (packId: string,  forPackId: string): boolean {
        // let observerPack = this.getPackFromStorageOfPacks(packId);
        // if (observerPack && Array.isArray(observerPack.observers)) {
        //     observerPack.observers.push(forPackId);
        //     return true;
        // }
        return false;
    }

    public removeObserver (observerPackId: string,  observerablePackId: string): boolean {
        // let observerPack = this.getPackFromStorageOfPacks(observerPackId);
        // if (observerPack && observerPack.observers.length > 0) {
        //     let idx = observerPack.observers.indexOf(observerablePackId);
        //     if (idx > -1) delete observerPack.observers[idx];
        //     return true;
        // }
        return false;
    }

    private getIdsOfObservers (observerPackId: string): string[] {
        // let observerPack = this.getPackFromStorageOfPacks(observerPackId);
        return []; //(observerPack) ? observerPack.observers : [];
    }

    public removePack (...packIds: string[]): void {
        if (!Array.isArray(packIds) || packIds.length === 0) return;
        for (let packId of packIds) {
            this.removeStorageOfPack(packId);
            this.removePackToLocalStorageOfPacks(packId);
        }
    }

    private getPackFromStorageOfPacks (packId: string) {
        return (this.storageOfPacks[packId]) ? this.storageOfPacks[packId] : null;
    }
    private getPackClassFromStorageOfPacks (packId: string): MzPackInterface | null {
        let pack = this.getPackFromStorageOfPacks(packId);
        return (pack && pack.class) ? this.storageOfPacks[packId].class : null;
    }

    private getAllPackClassFromStorageOfPacks (): MzPackInterface[] {
        let packs = [];
        for (let packId of Object.keys(this.storageOfPacks)) {
            packs.push(this.storageOfPacks[packId].class);
        }
        return packs;
    }

    private addStorageOfPack (pack: MzPackInterface) {
        this.storage[pack.id] = pack.storage;
    }
    private removeStorageOfPack (packId: string) {
        if(this.storage[packId]) delete this.storage[packId];
    }

    private groupSubscribers () {
        let storageOfPacks  = this.storageOfPacks,
            subscriptions   = this.subscriptions;
        for ( let packId of Object.keys(storageOfPacks) ) {
            // ge pack
            let pack = storageOfPacks[packId] && storageOfPacks[packId].class;

            if (pack) {
                // add to array all subscriptions
                subscriptions.onAddItem.push(pack.onAddItem$);
                subscriptions.onChangeItem.push(pack.onChangeItem$);
                subscriptions.onWriteItem.push(pack.onWriteItem$);
                subscriptions.onRemoveItem.push(pack.onRemoveItem$);
                subscriptions.onChangeState.push(pack.onChangeState$);
            }
        }

    }
    
    private runProslushka () {
            
    }
    
    // add pack with create initial data
    private subscribeToAllPack () {
        // unsubscribe for all changes
        this.unsubscribeToAllPack();

        // group all flows -> merge all flows$ to one by type
        this.groupSubscribers();

        let subscriptions = this.subscriptions,
            storageOfPacks = this.storageOfPacks;

        // merge  all back whitch early group to array
        this.onAddItem$     = merge(subscriptions.onAddItem);
        this.onRemoveItem$  = merge(subscriptions.onRemoveItem);
        this.onChangeItem$  = merge(subscriptions.onChangeItem);
        this.onChangeState$ = merge(subscriptions.onChangeState);
        this.onWriteItem$   = merge(subscriptions.onWriteItem);
    }

    private unsubscribeToAllPack () {
        let subscriptions   = this.subscriptions;

        for ( let subtypeKey of Object.keys(subscriptions) ) {
            // @ts-ignore - get array with subscriptions -> clear
            let arrWithSubsctiptions = subscriptions[subtypeKey];

            // @ts-ignore - clear with unsubscribe
            this.subscriptions[subtypeKey] = arrWithSubsctiptions.filter(
                (flow$: any) => flow$ && flow$.unsubscribe() && false
            )
        }
    }

    // add pack with create initial data
    private addPackToLocalStorageOfPacks (pack: MzPackInterface) {
        this.storageOfPacks[pack.id] = {
            class: pack,
            bindingPacks: []
        };
    }
    
    private removePackToLocalStorageOfPacks (packId: string) {
        if(this.storageOfPacks[packId]) delete this.storageOfPacks[packId];
    }

    constructor () {
        // this.onChangeItem$.subscribe(
        //     (item) => {
        //         // start item emitter
        //         // invoke all bindend emiter
        //     }
        // );
        //
        // this.onChangeState$.subscribe(
        // (item) => {
        // // start item emitter
        // //
        // //     }
        // // );
        //
        // this.onRemoveItem$.subscribe(
        //     () => {
        //         // start item emitter
        //
        //     }
        // );
        //
        // this.onAddItem$.subscribe(
        //     (item) => {
        //         // start item emitter
        //
        //     }
        // );
    }
}