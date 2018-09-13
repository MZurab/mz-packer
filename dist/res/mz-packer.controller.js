"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var common_enum_1 = require("./@abstract/@enum/common.enum");
var MzPacker = /** @class */ (function () {
    function MzPacker() {
        this.storage = {};
        this.storageOfPacks = {};
        this.subscriptionsOnChangeState$ = [];
        this.onChangeStorage$ = new rxjs_1.Subject();
        //@< CHANGE CHANGING
        this.onChangeItem$ = new rxjs_1.Subject();
        //@> CHANGE CHANGING
        //@< REMOVE CHANGING
        this.onRemoveItem$ = new rxjs_1.Subject();
        //@> REMOVE CHANGING
        //@< ADD CHANGING
        this.onAddItem$ = new rxjs_1.Subject();
        //@> ADD CHANGING
        //@< STATE CHANGING
        this.onChangeState$ = new rxjs_1.Subject();
        this.onChangeItem$.subscribe(function (item) {
            // start item emitter
            // invoke all bindend emiter
        });
        this.onChangeState$.subscribe(function (item) {
            // start item emitter
        });
        this.onRemoveItem$.subscribe(function () {
            // start item emitter
        });
        this.onAddItem$.subscribe(function (item) {
            // start item emitter
        });
    }
    MzPacker.prototype.getAllPacksOrPackByPackId = function (packId) {
        var packs = [];
        if (packId) {
            var pack = this.getPackClassFromStorageOfPacks(packId);
            packs.push(pack);
        }
        else {
            packs = this.getAllPackClassFromStorageOfPacks();
        }
        return packs;
    };
    MzPacker.prototype.canChangeItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.canChangeItem(id, item)];
            });
        });
    };
    // async _preChangeItem (pack: MzPackInterface, id: string, item: any): Promise<void> {
    //    
    // }
    MzPacker.prototype.preChangeItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.preChangeItem(id, item)];
            });
        });
    };
    MzPacker.prototype.postChangeItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.postChangeItem(id, item)];
            });
        });
    };
    MzPacker.prototype.changeItem = function (id, item, packId, consistently) {
        if (consistently === void 0) { consistently = false; }
        return __awaiter(this, void 0, void 0, function () {
            var packs, _i, packs_1, pack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packs = this.getAllPacksOrPackByPackId(packId);
                        _i = 0, packs_1 = packs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < packs_1.length)) return [3 /*break*/, 6];
                        pack = packs_1[_i];
                        //@guard - we have pack
                        if (!pack)
                            return [3 /*break*/, 6];
                        if (!consistently) return [3 /*break*/, 3];
                        return [4 /*yield*/, pack.changeItem(id, item)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        pack.changeItem(id, item);
                        _a.label = 4;
                    case 4:
                        // emit all sub
                        this.onChangeItem$.next({
                            packId: packId,
                            state: this.getStateFromPack(pack),
                            storage: pack.storage,
                            item: item,
                            id: id,
                            type: common_enum_1.MzItemTypeEnum.change
                        });
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MzPacker.prototype.canRemoveItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.canRemoveItem(id, item)];
            });
        });
    };
    MzPacker.prototype.preRemoveItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.preRemoveItem(id, item)];
            });
        });
    };
    MzPacker.prototype.postRemoveItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.postRemoveItem(id, item)];
            });
        });
    };
    MzPacker.prototype.removeItem = function (id, item, packId, consistently) {
        if (consistently === void 0) { consistently = false; }
        return __awaiter(this, void 0, void 0, function () {
            var packs, _i, packs_2, pack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packs = this.getAllPacksOrPackByPackId(packId);
                        _i = 0, packs_2 = packs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < packs_2.length)) return [3 /*break*/, 6];
                        pack = packs_2[_i];
                        //@guard - we have pack
                        if (!pack)
                            return [3 /*break*/, 6];
                        if (!consistently) return [3 /*break*/, 3];
                        return [4 /*yield*/, pack.removeItem(id, item)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        pack.removeItem(id, item);
                        _a.label = 4;
                    case 4:
                        // emit
                        this.onRemoveItem$.next({
                            packId: packId,
                            state: this.getStateFromPack(pack),
                            storage: pack.storage,
                            item: item,
                            id: id,
                            type: common_enum_1.MzItemTypeEnum.change
                        });
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MzPacker.prototype.canAddItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.canAddItem(id, item)];
            });
        });
    };
    MzPacker.prototype.preAddItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.preAddItem(id, item)];
            });
        });
    };
    MzPacker.prototype.postAddItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.postAddItem(id, item)];
            });
        });
    };
    MzPacker.prototype.addItem = function (id, item, packId, consistently, callback) {
        if (consistently === void 0) { consistently = false; }
        return __awaiter(this, void 0, void 0, function () {
            var packs, _i, packs_3, pack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packs = this.getAllPacksOrPackByPackId(packId);
                        _i = 0, packs_3 = packs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < packs_3.length)) return [3 /*break*/, 6];
                        pack = packs_3[_i];
                        //@guard - we have pack
                        if (!pack)
                            return [3 /*break*/, 6];
                        if (!consistently) return [3 /*break*/, 3];
                        return [4 /*yield*/, // add to pack
                            pack.addItem(id, item, function (state, id, item) {
                                if (typeof callback === 'function' && packId)
                                    callback(packId, state, id, item);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        // add to pack
                        pack.addItem(id, item, function (state, id, item) {
                            if (typeof callback === 'function' && packId)
                                callback(packId, state, id, item);
                        });
                        _a.label = 4;
                    case 4:
                        this.onAddItem$.next({
                            packId: packId,
                            state: this.getStateFromPack(pack),
                            storage: pack.storage,
                            item: item,
                            id: id,
                            type: common_enum_1.MzItemTypeEnum.change
                        });
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MzPacker.prototype.getStateFromPack = function (pack, newState) {
        return pack.getStateFromPack(newState);
    };
    MzPacker.prototype.changeStateByPack = function (pack, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canChangeState(pack, state)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.preChangeState(pack, state)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, pack.changeState(state)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.postChangeState(pack, state)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MzPacker.prototype.canChangeState = function (pack, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pack.canChangeState(state)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MzPacker.prototype.preChangeState = function (pack, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                pack.preChangeState(state);
                return [2 /*return*/];
            });
        });
    };
    MzPacker.prototype.postChangeState = function (pack, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                pack.postChangeState(state);
                return [2 /*return*/];
            });
        });
    };
    MzPacker.prototype.changeState = function (newState, packId, consistently) {
        if (consistently === void 0) { consistently = false; }
        return __awaiter(this, void 0, void 0, function () {
            var packs, _i, packs_4, pack, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packs = this.getAllPacksOrPackByPackId(packId);
                        _i = 0, packs_4 = packs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < packs_4.length)) return [3 /*break*/, 6];
                        pack = packs_4[_i];
                        //@guard - we have pack
                        if (!pack)
                            return [3 /*break*/, 6];
                        state = this.getStateFromPack(pack, newState);
                        if (!consistently) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.changeStateByPack(pack, state)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.changeStateByPack(pack, state);
                        _a.label = 4;
                    case 4:
                        // emit all sub
                        this.onChangeState$.next({
                            packId: packId,
                            state: this.getStateFromPack(pack),
                            storage: pack.storage
                        });
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //@> STATE CHANGING
    MzPacker.prototype.addPack = function () {
        var packs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packs[_i] = arguments[_i];
        }
        if (!Array.isArray(packs) || packs.length === 0)
            return;
        for (var _a = 0, packs_5 = packs; _a < packs_5.length; _a++) {
            var pack = packs_5[_a];
            this.addStorageOfPack(pack);
            this.addPackToLocalStorageOfPacks(pack);
        }
    };
    MzPacker.prototype.addObserver = function (observerPackId, observerablePackId) {
        var observerPack = this.getPackFromStorageOfPacks(observerPackId);
        if (observerPack && Array.isArray(observerPack.observers)) {
            observerPack.observers.push(observerablePackId);
            return true;
        }
        return false;
    };
    MzPacker.prototype.removeObserver = function (observerPackId, observerablePackId) {
        var observerPack = this.getPackFromStorageOfPacks(observerPackId);
        if (observerPack && observerPack.observers.length > 0) {
            var idx = observerPack.observers.indexOf(observerablePackId);
            if (idx > -1)
                delete observerPack.observers[idx];
            return true;
        }
        return false;
    };
    MzPacker.prototype.getIdsOfObservers = function (observerPackId) {
        var observerPack = this.getPackFromStorageOfPacks(observerPackId);
        return (observerPack) ? observerPack.observers : [];
    };
    MzPacker.prototype.removePack = function () {
        var packIds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packIds[_i] = arguments[_i];
        }
        if (!Array.isArray(packIds) || packIds.length === 0)
            return;
        for (var _a = 0, packIds_1 = packIds; _a < packIds_1.length; _a++) {
            var packId = packIds_1[_a];
            this.removeStorageOfPack(packId);
            this.removePackToLocalStorageOfPacks(packId);
        }
    };
    MzPacker.prototype.getPackFromStorageOfPacks = function (packId) {
        return (this.storageOfPacks[packId]) ? this.storageOfPacks[packId] : null;
    };
    MzPacker.prototype.getPackClassFromStorageOfPacks = function (packId) {
        var pack = this.getPackFromStorageOfPacks(packId);
        return (pack && pack.class) ? this.storageOfPacks[packId].class : null;
    };
    MzPacker.prototype.getAllPackClassFromStorageOfPacks = function () {
        var packs = [];
        for (var _i = 0, _a = Object.keys(this.storageOfPacks); _i < _a.length; _i++) {
            var packId = _a[_i];
            packs.push(this.storageOfPacks[packId].class);
        }
        return packs;
    };
    MzPacker.prototype.addStorageOfPack = function (pack) {
        this.storage[pack.id] = pack.storage;
    };
    MzPacker.prototype.removeStorageOfPack = function (packId) {
        if (this.storage[packId])
            delete this.storage[packId];
    };
    // add pack with create initial data
    MzPacker.prototype.subscribeToAllPack = function () {
        // // unsubscribe for all changes
        // this.unsubscribeToAllPack();
        //
        // let storageOfPacks = this.storageOfPacks;
        //
        // // subscribe to all current packs
        // for (let packId of Object.keys(storageOfPacks)) {
        //     let subscription = storageOfPacks[packId].class.onChangeState$.subscribe (
        //         (input) => {
        //             this.onChangeState$.next({...input, packId: packId});
        //         }
        //     );
        //     // save subscriptions for can later unsubscribe
        //     this.subscriptionsOnChangeState$.push(subscription)
        // }
    };
    MzPacker.prototype.unsubscribeToAllPack = function () {
        // let subscriptionsOnChangeState$ = this.subscriptionsOnChangeState$;
        // // save unsubscribe from all observables
        // if( Array.isArray(subscriptionsOnChangeState$) ) {
        //     for (let observable of subscriptionsOnChangeState$) {
        //         observable.unsubscribe();
        //     }
        // }
        // // clear array
        // subscriptionsOnChangeState$ = [];
    };
    // add pack with create initial data
    MzPacker.prototype.addPackToLocalStorageOfPacks = function (pack) {
        this.storageOfPacks[pack.id] = {
            class: pack,
            observers: []
        };
    };
    MzPacker.prototype.removePackToLocalStorageOfPacks = function (packId) {
        if (this.storageOfPacks[packId])
            delete this.storageOfPacks[packId];
    };
    return MzPacker;
}());
exports.MzPacker = MzPacker;
