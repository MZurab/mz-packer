import {MzPackInterface} from "../@interface/mz-pack.interface";
import {Subject, Observable} from "rxjs";

export abstract class MzPackAbstractClass implements MzPackInterface{
    abstract id: string;
    abstract storage: any;
    public state: any = null;

    public onChangeState$   = Observable.create();
    public onChangeItem$    = Observable.create();

    add(id: string, item: any, callback?: (state: { current: string; previous: string }, id: string, item: any) => void): void {
    }

    change(id: string, item: any, callback?: (state: { current: string; previous: string }, id: string, item: any) => void): void {
    }

    //
    changeState(state: string): void {
    }
    //

    onAdd(id: string, item: any): void {
    }

    onChangeState(state: string): void {
    }

    onEdit(id: string, item: any): void {
    }

    onLinkedAdd(id: string, item: any, packId: string, storage: any): void {
    }

    onLinkedChangeState(state: string, packId: string, storage: any): void {
    }

    onLinkedEdit(id: string, item: any, packId: string, storage: any): void {
    }

    onLinkedRemove(id: string, item: any, packId: string, storage: any): void {
    }

    onLinkedWrite(id: string, item: any, packId: string, storage: any): void {
    }

    onRemove(id: string, item: any): void {
    }

    onWrite(id: string, item: any): void {
    }

    remove(id: string, item: any, callback?: (state: { current: string; previous: string }, id: string, item: any) => void): void {
    }

}