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
var MzPacker = /** @class */ (function () {
    function MzPacker() {
        this.storage = {};
        this.storageOfPacks = {};
        this.subscriptions = {
            onAddItem: [],
            onWriteItem: [],
            onChangeItem: [],
            onRemoveItem: [],
            onChangeState: [],
        };
        this.subscriptionsOnChangeState$ = [];
        this.onChangeStorage$ = new rxjs_1.Subject();
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
                return [2 /*return*/, pack.canChangeItem(id, item, pack.id)];
            });
        });
    };
    MzPacker.prototype.preChangeItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.preChangeItem(id, item, pack.id)];
            });
        });
    };
    MzPacker.prototype.postChangeItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.postChangeItem(id, item, pack.id)];
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
                        if (!(_i < packs_1.length)) return [3 /*break*/, 5];
                        pack = packs_1[_i];
                        //@guard - we have pack
                        if (!pack)
                            return [3 /*break*/, 5];
                        if (!consistently) return [3 /*break*/, 3];
                        return [4 /*yield*/, pack.changeItem(id, item, pack.id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        pack.changeItem(id, item, pack.id);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MzPacker.prototype.canRemoveItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.canRemoveItem(id, item, pack.id)];
            });
        });
    };
    MzPacker.prototype.preRemoveItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.preRemoveItem(id, item, pack.id)];
            });
        });
    };
    MzPacker.prototype.postRemoveItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.postRemoveItem(id, item, pack.id)];
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
                        if (!(_i < packs_2.length)) return [3 /*break*/, 5];
                        pack = packs_2[_i];
                        //@guard - we have pack
                        if (!pack)
                            return [3 /*break*/, 5];
                        if (!consistently) return [3 /*break*/, 3];
                        return [4 /*yield*/, pack.removeItem(id, item, pack.id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        pack.removeItem(id, item, pack.id);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MzPacker.prototype.canAddItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.canAddItem(id, item, pack.id)];
            });
        });
    };
    MzPacker.prototype.preAddItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.preAddItem(id, item, pack.id)];
            });
        });
    };
    MzPacker.prototype.postAddItem = function (pack, id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.postAddItem(id, item, pack.id)];
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
                        if (!(_i < packs_3.length)) return [3 /*break*/, 5];
                        pack = packs_3[_i];
                        //@guard - we have pack
                        if (!pack)
                            return [3 /*break*/, 5];
                        if (!consistently) return [3 /*break*/, 3];
                        return [4 /*yield*/, // add to pack
                            pack.addItem(id, item, pack.id, function (state, id, item) {
                                if (typeof callback === 'function' && packId)
                                    callback(packId, state, id, item);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        // add to pack
                        pack.addItem(id, item, pack.id, function (state, id, item) {
                            if (typeof callback === 'function' && packId)
                                callback(packId, state, id, item);
                        });
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MzPacker.prototype.canWriteItem = function (pack, id, item, typeChage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.canWriteItem(id, item, typeChage, pack.id)];
            });
        });
    };
    MzPacker.prototype.preWriteItem = function (pack, id, item, typeChage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.preWriteItem(id, item, typeChage, pack.id)];
            });
        });
    };
    MzPacker.prototype.postWriteItem = function (pack, id, item, typeChage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, pack.postWriteItem(id, item, typeChage, pack.id)];
            });
        });
    };
    MzPacker.prototype.writeItem = function (id, item, typeChage, packId, consistently, callback) {
        if (consistently === void 0) { consistently = false; }
        return __awaiter(this, void 0, void 0, function () {
            var packs, _i, packs_4, pack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packs = this.getAllPacksOrPackByPackId(packId);
                        _i = 0, packs_4 = packs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < packs_4.length)) return [3 /*break*/, 5];
                        pack = packs_4[_i];
                        //@guard - we have pack
                        if (!pack)
                            return [3 /*break*/, 5];
                        if (!consistently) return [3 /*break*/, 3];
                        return [4 /*yield*/, // add to pack
                            pack.writeItem(id, item, typeChage, pack.id, function (state, id, item) {
                                if (typeof callback === 'function' && packId)
                                    callback(packId, state, id, item);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        // add to pack
                        pack.writeItem(id, item, typeChage, pack.id, function (state, id, item) {
                            if (typeof callback === 'function' && packId)
                                callback(packId, state, id, item);
                        });
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
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
                        return [4 /*yield*/, pack.changeState(state, pack.id)];
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
                    case 0: return [4 /*yield*/, pack.canChangeState(state, pack.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MzPacker.prototype.preChangeState = function (pack, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                pack.preChangeState(state, pack.id);
                return [2 /*return*/];
            });
        });
    };
    MzPacker.prototype.postChangeState = function (pack, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                pack.postChangeState(state, pack.id);
                return [2 /*return*/];
            });
        });
    };
    MzPacker.prototype.changeState = function (newState, packId, consistently) {
        if (consistently === void 0) { consistently = false; }
        return __awaiter(this, void 0, void 0, function () {
            var packs, _i, packs_5, pack, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packs = this.getAllPacksOrPackByPackId(packId);
                        _i = 0, packs_5 = packs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < packs_5.length)) return [3 /*break*/, 5];
                        pack = packs_5[_i];
                        //@guard - we have pack
                        if (!pack)
                            return [3 /*break*/, 5];
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
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
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
        for (var _a = 0, packs_6 = packs; _a < packs_6.length; _a++) {
            var pack = packs_6[_a];
            this.addStorageOfPack(pack);
            this.addPackToLocalStorageOfPacks(pack);
        }
    };
    MzPacker.prototype.addObserver = function (packId, forPackId) {
        // let observerPack = this.getPackFromStorageOfPacks(packId);
        // if (observerPack && Array.isArray(observerPack.observers)) {
        //     observerPack.observers.push(forPackId);
        //     return true;
        // }
        return false;
    };
    MzPacker.prototype.removeObserver = function (observerPackId, observerablePackId) {
        // let observerPack = this.getPackFromStorageOfPacks(observerPackId);
        // if (observerPack && observerPack.observers.length > 0) {
        //     let idx = observerPack.observers.indexOf(observerablePackId);
        //     if (idx > -1) delete observerPack.observers[idx];
        //     return true;
        // }
        return false;
    };
    MzPacker.prototype.getIdsOfObservers = function (observerPackId) {
        // let observerPack = this.getPackFromStorageOfPacks(observerPackId);
        return []; //(observerPack) ? observerPack.observers : [];
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
    MzPacker.prototype.groupSubscribers = function () {
        var storageOfPacks = this.storageOfPacks, subscriptions = this.subscriptions;
        for (var _i = 0, _a = Object.keys(storageOfPacks); _i < _a.length; _i++) {
            var packId = _a[_i];
            // ge pack
            var pack = storageOfPacks[packId] && storageOfPacks[packId].class;
            if (pack) {
                // add to array all subscriptions
                subscriptions.onAddItem.push(pack.onAddItem$);
                subscriptions.onChangeItem.push(pack.onChangeItem$);
                subscriptions.onWriteItem.push(pack.onWriteItem$);
                subscriptions.onRemoveItem.push(pack.onRemoveItem$);
                subscriptions.onChangeState.push(pack.onChangeState$);
            }
        }
    };
    MzPacker.prototype.runProslushka = function () {
    };
    // add pack with create initial data
    MzPacker.prototype.subscribeToAllPack = function () {
        // unsubscribe for all changes
        this.unsubscribeToAllPack();
        // group all flows -> merge all flows$ to one by type
        this.groupSubscribers();
        var subscriptions = this.subscriptions, storageOfPacks = this.storageOfPacks;
        // merge  all back whitch early group to array
        this.onAddItem$ = rxjs_1.merge(subscriptions.onAddItem);
        this.onRemoveItem$ = rxjs_1.merge(subscriptions.onRemoveItem);
        this.onChangeItem$ = rxjs_1.merge(subscriptions.onChangeItem);
        this.onChangeState$ = rxjs_1.merge(subscriptions.onChangeState);
        this.onWriteItem$ = rxjs_1.merge(subscriptions.onWriteItem);
    };
    MzPacker.prototype.unsubscribeToAllPack = function () {
        var subscriptions = this.subscriptions;
        for (var _i = 0, _a = Object.keys(subscriptions); _i < _a.length; _i++) {
            var subtypeKey = _a[_i];
            // @ts-ignore - get array with subscriptions -> clear
            var arrWithSubsctiptions = subscriptions[subtypeKey];
            // @ts-ignore - clear with unsubscribe
            this.subscriptions[subtypeKey] = arrWithSubsctiptions.filter(function (flow$) { return flow$ && flow$.unsubscribe() && false; });
        }
    };
    // add pack with create initial data
    MzPacker.prototype.addPackToLocalStorageOfPacks = function (pack) {
        this.storageOfPacks[pack.id] = {
            class: pack,
            bindingPacks: []
        };
    };
    MzPacker.prototype.removePackToLocalStorageOfPacks = function (packId) {
        if (this.storageOfPacks[packId])
            delete this.storageOfPacks[packId];
    };
    return MzPacker;
}());
exports.MzPacker = MzPacker;
