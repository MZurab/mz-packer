import {Subject, Subscription} from "rxjs";

import {MzPackerInterface} from "./@abstract/@interface/mz-packer.interface";
import {
    MzInputOnChangeItem,
    MzInputOnChangeState,
    MzInputOnChangeStorage, MzState,
    MzStorageOfPacks
} from "./@abstract/@type/common.type";
import {MzPackInterface} from "./@abstract/@interface/mz-pack.interface";

export class MzPacker implements MzPackerInterface {
    public storage: any = {};
    public storageOfPacks: MzStorageOfPacks = {};

    public onChangeState$: Subject<MzInputOnChangeState> = new Subject();
    private subscriptionsOnChangeState$: Subscription[] = [];

    public onChangeItem$: Subject<MzInputOnChangeItem> = new Subject();
    public onChangeStorage$: Subject<MzInputOnChangeStorage> = new Subject();



    public async change (
        id: string,
        item: any,
        packId?: string,
        consistently: boolean = false
    ): Promise<void> {
        let packs = this.getAllPacksOrPackByPackId(packId);
        for (let pack of packs) {
            pack && pack.change(id, item);
        }
    }

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
        protected async canChangeItem (pack: MzPackInterface, id: string, item: any): Promise<boolean> {
            return  pack.canChangeItem(id, item);
        }

        protected async preChangeItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.preChangeItem(id, item);
        }

        protected async postChangeItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
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
                if(!pack) break;
                // add to pack
                pack.changeItem(id, item, consistently);
            }
        }
    //@> CHANGE CHANGING

    //@< REMOVE CHANGING
        protected async canRemoveItem (pack: MzPackInterface, id: string, item: any): Promise<boolean> {
            return  pack.canRemoveItem(id, item );
        }

        protected async preRemoveItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.preRemoveItem(id, item);
        }

        protected async postRemoveItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
            return pack.postRemoveItem(id, item);
        }

        public async removeItem (
            id: string,
            item: any,
            packId?: string,
            consistently: boolean = false
        ): Promise<void> {
            let packs = this.getAllPacksOrPackByPackId(packId);
            for (let pack of packs) {
                if(!pack) break;
                // add to pack
                pack.removeItem(id, item, consistently);
            }
        }
    //@> REMOVE CHANGING

    //@< ADD CHANGING
        protected async canAddItem (pack: MzPackInterface, id: string, item: any,  consistently: boolean = false): Promise<boolean> {
            return  pack.canAddItem(id, item, consistently);
        }

        protected async preAddItem (pack: MzPackInterface, id: string, item: any,  consistently: boolean = false): Promise<void> {
            return pack.preAddItem(id, item, consistently);
        }

        protected async postAddItem (id: string, item: any, pack: MzPackInterface, consistently: boolean = false): Promise<void> {
            return pack.postAddItem(id, item, consistently);
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
                if(!pack) break;
                // add to pack
                pack.addItem(id, item, consistently, callback);

            }
        }
    //@> ADD CHANGING

    //@< STATE CHANGING
        private getStateFromPack (pack: MzPackInterface, newState: string): MzState  {
            return {
                current: newState,
                previous: pack.state
            }
        }

        private async changeStateByPack (pack: MzPackInterface, state: MzState) {
            if( await this.canChangeState(pack, state) ) {
                await this.preChangeState(pack, state);
                await pack.changeState(state);
                await this.postChangeState(pack, state);
            }
        }

        protected async canChangeState (pack: MzPackInterface, state: MzState): Promise<boolean> {
            return await pack.canChangeState(state);
        }

        protected async preChangeState (pack: MzPackInterface, state: MzState): Promise<void> {
            pack.preChangeState(state);
        }

        protected async postChangeState (pack: MzPackInterface, state: MzState): Promise<void> {
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
            }
        }
    //@> STATE CHANGING

    public async remove (
        id: string,
        item: any,
        packId?: string,
        consistently: boolean = false
    ): Promise<void> {
        let pack = this.getPackClassFromStorageOfPacks(packId);
        if (pack) {
            pack.remove(id, item);
        }
    }

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
                    input.packId = packId;
                    this.onChangeState$.next(input);
                }
            );
            // save subscriptions for later unsubscribe
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
            story: {
                ofAdd: [],
                ofRemove: [],
                ofEdit: []
            }
        };
    }
    private removePackToLocalStorageOfPacks (packId: string) {
        if(this.storageOfPacks[packId]) delete this.storageOfPacks[packId];
    }
}