import {Subject, Subscription} from "rxjs";

import {MzPackerInterface} from "./@abstract/@interface/mz-packer.interface";
import {
    MzInputOnChangeItem,
    MzInputOnChangeState,
    MzInputOnChangeStorage, MzState,
    MzStorageOfPacks
} from "./@abstract/@type/common.type";
import {MzPackInterface} from "./@abstract/@interface/mz-pack.interface";
import {MzItemTypeEnum} from "./@abstract/@enum/common.enum";

export class MzPacker implements MzPackerInterface {
    public storage: any = {};
    public storageOfPacks: MzStorageOfPacks = {};

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


    //@< CHANGE CHANGING
        public readonly onChangeItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canChangeItem (pack: MzPackInterface, id: string, item: any): Promise<boolean> {
            return  pack.canChangeItem(id, item);
        }
        
        // async _preChangeItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
        //    
        // }
        
        async preChangeItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.preChangeItem(id, item);
        }

        async postChangeItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.postChangeItem(id, item);
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
                    await pack.changeItem(id, item);
                else
                    pack.changeItem(id, item);

                // emit all sub
                this.onChangeItem$.next(
                    {
                        packId: packId,
                        state: this.getStateFromPack(pack),
                        storage: pack.storage,
                        item: item,
                        id: id,
                        type: MzItemTypeEnum.change
                    }
                )
            }
        }
    //@> CHANGE CHANGING

    //@< REMOVE CHANGING
        public readonly onRemoveItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canRemoveItem (pack: MzPackInterface, id: string, item: any): Promise<boolean> {
            return  pack.canRemoveItem(id, item );
        }

        async preRemoveItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.preRemoveItem(id, item);
        }

        async postRemoveItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.postRemoveItem(id, item);
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
                    await pack.removeItem(id, item);
                else
                    pack.removeItem(id, item);

                // emit
                this.onRemoveItem$.next(
                    {
                        packId: packId,
                        state: this.getStateFromPack(pack),
                        storage: pack.storage,
                        item: item,
                        id: id,
                        type: MzItemTypeEnum.change
                    }
                )
            }
        }
    //@> REMOVE CHANGING

    //@< ADD CHANGING
        public readonly onAddItem$: Subject<MzInputOnChangeItem> = new Subject();

        async canAddItem (pack: MzPackInterface, id: string, item: any): Promise<boolean> {
            return  pack.canAddItem(id, item);
        }

        async preAddItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.preAddItem(id, item);
        }

        async postAddItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.postAddItem(id, item);
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
                            (state: MzState, id: string, item: any) => {
                                if(typeof callback === 'function' && packId) callback( packId, state, id, item)
                            }
                        );
                else
                // add to pack
                    pack.addItem(
                        id,
                        item,
                        (state: MzState, id: string, item: any) => {
                            if(typeof callback === 'function' && packId) callback( packId, state, id, item)
                        }
                    );

                this.onAddItem$.next(
                    {
                        packId: packId,
                        state: this.getStateFromPack(pack),
                        storage: pack.storage,
                        item: item,
                        id: id,
                        type: MzItemTypeEnum.change
                    }
                )
            }
        }
    //@> ADD CHANGING

    //@< STATE CHANGING
        public readonly onChangeState$: Subject<MzInputOnChangeState> = new Subject();

        private getStateFromPack (pack: MzPackInterface, newState?: string): MzState  {
            return pack.getStateFromPack(newState);
        }

        private async changeStateByPack (pack: MzPackInterface, state: MzState) {
            if ( await this.canChangeState(pack, state) ) {
                await this.preChangeState(pack, state);
                await pack.changeState(state);
                await this.postChangeState(pack, state);
            }
        }

        async canChangeState (pack: MzPackInterface, state: MzState): Promise<boolean> {
            return await pack.canChangeState(state);
        }

        async preChangeState (pack: MzPackInterface, state: MzState): Promise<void> {
            pack.preChangeState(state);
        }

        async postChangeState (pack: MzPackInterface, state: MzState): Promise<void> {
            pack.postChangeState(state);
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

                // emit all sub
                this.onChangeState$.next(
                    {
                        packId: packId,
                        state: this.getStateFromPack(pack),
                        storage: pack.storage
                    }
                )
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

    public addObserver (observerPackId: string,  observerablePackId: string): boolean {
        let observerPack = this.getPackFromStorageOfPacks(observerPackId);
        if (observerPack && Array.isArray(observerPack.observers)) {
            observerPack.observers.push(observerablePackId);
            return true;
        }
        return false;
    }

    public removeObserver (observerPackId: string,  observerablePackId: string): boolean {
        let observerPack = this.getPackFromStorageOfPacks(observerPackId);
        if (observerPack && observerPack.observers.length > 0) {
            let idx = observerPack.observers.indexOf(observerablePackId);
            if (idx > -1) delete observerPack.observers[idx];
            return true;
        }
        return false;
    }

    private getIdsOfObservers (observerPackId: string): string[] {
        let observerPack = this.getPackFromStorageOfPacks(observerPackId);
        return (observerPack) ? observerPack.observers : [];
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

    // add pack with create initial data
    private subscribeToAllPack () {
        // unsubscribe for all changes
        this.unsubscribeToAllPack();

        let storageOfPacks = this.storageOfPacks;

        // subscribe to all current packs
        for (let packId of Object.keys(storageOfPacks)) {
            let subscription = storageOfPacks[packId].class.onChangeState$.subscribe (
                (input) => {
                    this.onChangeState$.next({...input, packId: packId});
                }
            );
            // save subscriptions for can later unsubscribe
            this.subscriptionsOnChangeState$.push(subscription)
        }
    }

    private unsubscribeToAllPack () {
        let subscriptionsOnChangeState$ = this.subscriptionsOnChangeState$;
        // save unsubscribe from all observables
        if( Array.isArray(subscriptionsOnChangeState$) ) {
            for (let observable of subscriptionsOnChangeState$) {
                observable.unsubscribe();
            }
        }
        // clear array
        subscriptionsOnChangeState$ = [];
    }

    // add pack with create initial data
    private addPackToLocalStorageOfPacks (pack: MzPackInterface) {
        this.storageOfPacks[pack.id] = {
            class: pack,
            observers: [],
            subscriptions: {
                onChangeItem: [],
                onWriteItem: [],
                onAddItem: [],
                onRemoveItem: [],
                onChangeState: [],
            }
        };
    }
    
    private removePackToLocalStorageOfPacks (packId: string) {
        if(this.storageOfPacks[packId]) delete this.storageOfPacks[packId];
    }

    constructor () {
        this.onChangeItem$.subscribe(
            (item) => {
                // start item emitter
                // invoke all bindend emiter
            }
        );

        this.onChangeState$.subscribe(
            (item) => {
                // start item emitter

            }
        );

        this.onRemoveItem$.subscribe(
            () => {
                // start item emitter

            }
        );

        this.onAddItem$.subscribe(
            (item) => {
                // start item emitter

            }
        );
    }
}