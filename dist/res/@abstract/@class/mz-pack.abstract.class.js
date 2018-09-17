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
var common_enum_1 = require("../@enum/common.enum");
var MzPackAbstractClass = /** @class */ (function () {
    function MzPackAbstractClass() {
        this.state = null;
        this.lastState = null;
        this.allItems = [];
        //@< RETRANSLATOR
        // packs for retranslator
        this.packsForRetranslator = [];
        this.myRetranslators = [];
        //@< EMIT BLOCK
        this.onEmit$ = new rxjs_1.Subject();
        //@< EMIT BLOCK
        //@< ADD ITEM
        this.onAddItem$ = new rxjs_1.Subject();
        //@> ADD ITEM
        //@< REMOVE ITEM
        this.onRemoveItem$ = new rxjs_1.Subject();
        //@> REMOVE ITEM
        //@< CHANGE ITEM
        this.onChangeItem$ = new rxjs_1.Subject();
        //@> CHANGE ITEM
        //@< WRITE ITEM
        this.onWriteItem$ = new rxjs_1.Subject();
        //@> WRITE ITEM
        //@< CHANGE STATE
        this.onChangeState$ = rxjs_1.Observable.create();
        //@> CHANGE STATE
    }
    MzPackAbstractClass.prototype.saveMyRetranslators = function () {
        var packs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packs[_i] = arguments[_i];
        }
        for (var _a = 0, packs_1 = packs; _a < packs_1.length; _a++) {
            var pack = packs_1[_a];
            this.myRetranslators.push(pack);
        }
        console.log('saveMyRetranslators', this.id, this.myRetranslators);
    };
    MzPackAbstractClass.prototype.removeMyRetranslators = function () {
        var packs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packs[_i] = arguments[_i];
        }
        var _loop_1 = function (pack) {
            this_1.myRetranslators = this_1.myRetranslators.filter(function (p) { return p.id !== pack.id; });
        };
        var this_1 = this;
        for (var _a = 0, packs_2 = packs; _a < packs_2.length; _a++) {
            var pack = packs_2[_a];
            _loop_1(pack);
        }
        console.log('removeMyRetranslators', this.id, this.myRetranslators);
    };
    MzPackAbstractClass.prototype.retranslateToPacks = function () {
        var packs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packs[_i] = arguments[_i];
        }
        this.clearPackForRetranslate();
        this.addPackForRetranslate.apply(this, packs);
    };
    MzPackAbstractClass.prototype.addPackForRetranslate = function () {
        var packs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packs[_i] = arguments[_i];
        }
        for (var _a = 0, packs_3 = packs; _a < packs_3.length; _a++) {
            var pack = packs_3[_a];
            this.packsForRetranslator.push(pack);
            pack.saveMyRetranslators(this);
        }
    };
    MzPackAbstractClass.prototype.removePackFromRetranslate = function () {
        var _this_1 = this;
        var packs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packs[_i] = arguments[_i];
        }
        var _loop_2 = function (pack) {
            this_2.packsForRetranslator = this_2.packsForRetranslator.filter(function (p) {
                // remove my ref from this
                p.removeMyRetranslators(_this_1);
                return p.id !== pack.id;
            });
        };
        var this_2 = this;
        for (var _a = 0, packs_4 = packs; _a < packs_4.length; _a++) {
            var pack = packs_4[_a];
            _loop_2(pack);
        }
    };
    MzPackAbstractClass.prototype.clearPackForRetranslate = function () {
        this.packsForRetranslator = [];
    };
    //@> RETRANSLATOR
    // add packer
    MzPackAbstractClass.prototype.addPacker = function () {
        var packers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packers[_i] = arguments[_i];
        }
        for (var _a = 0, packers_1 = packers; _a < packers_1.length; _a++) {
            var packer = packers_1[_a];
            var _this = this;
            packer.addPack(_this);
        }
    };
    MzPackAbstractClass.prototype.getStateFromPack = function (newState) {
        return {
            current: (newState) ? newState : this.state,
            previous: (newState) ? this.state : this.lastState
        };
    };
    MzPackAbstractClass.prototype.canEmit = function (data, packId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    MzPackAbstractClass.prototype.emit = function (data, packIds, packId) {
        if (packIds === void 0) { packIds = []; }
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canEmit(packIds, packId)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preEmit(data, packId)];
                    case 2:
                        // invoke pre
                        _a.sent();
                        // send to my retranslators
                        console.log('this.myRetranslators emit - ', this.myRetranslators);
                        this.myRetranslators.forEach(function (pack) {
                            console.log('this.myRetranslators pack.id - ', pack.id);
                            if (Array.isArray(packIds) &&
                                packIds.length > 0) { // if we get difined packIds send only to them
                                if (packIds.indexOf(pack.id) !== -1)
                                    pack.emit(data, packIds, packId);
                            }
                            else { // if we don't get difined packIds send to all my retranslators
                                pack.emit(data, packIds, packId);
                            }
                        });
                        // emit actions
                        this.onEmit$.next({
                            packId: this.id,
                            state: this.getStateFromPack(),
                            storage: this.storage,
                            data: data
                        });
                        // invoke post action
                        return [4 /*yield*/, this.postEmit(data, packId)];
                    case 3:
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.preEmit = function (data, packId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.postEmit = function (data, packId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // onBindedAddItem$: Subject<MzInputOnChangeItem> = new Subject();
    MzPackAbstractClass.prototype.canAddItem = function (id, item, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.canWriteItem(id, item, common_enum_1.MzItemTypeEnum.add, packId)];
            });
        });
    };
    MzPackAbstractClass.prototype.preAddItem = function (id, item, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.addItem = function (id, item, packId, callback) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canAddItem(id, item, packId)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preAddItem(id, item, packId)];
                    case 2:
                        // invoke pre
                        _a.sent();
                        // retranslator
                        this.packsForRetranslator.forEach(function (pack) {
                            pack.addItem(id, item, packId, callback);
                        });
                        // delete items with this id
                        this.allItems.push({ id: id, item: item });
                        // emit actions
                        this.onAddItem$.next({
                            packId: this.id,
                            state: this.getStateFromPack(),
                            storage: this.storage,
                            item: item,
                            id: id,
                            type: common_enum_1.MzItemTypeEnum.add
                        });
                        // invoke post action
                        return [4 /*yield*/, this.postAddItem(id, item, packId)];
                    case 3:
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.postAddItem = function (id, item, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // onBindedRemoveItem$: Subject<MzInputOnChangeItem> = new Subject();
    MzPackAbstractClass.prototype.canRemoveItem = function (id, packId, item) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.canWriteItem(id, item, common_enum_1.MzItemTypeEnum.remove, packId)];
            });
        });
    };
    MzPackAbstractClass.prototype.preRemoveItem = function (id, packId, item) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.removeItem = function (id, packId, item) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canRemoveItem(id, packId, item)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preRemoveItem(id, packId, item)];
                    case 2:
                        // invoke pre
                        _a.sent();
                        // retranslator
                        this.packsForRetranslator.forEach(function (pack) {
                            pack.removeItem(id, packId, item);
                        });
                        // if (packId === this.id) {
                        // delete items with this id
                        this.allItems = this.allItems.filter(function (item) { return item.id !== id; });
                        // emit
                        this.onRemoveItem$.next({
                            packId: this.id,
                            state: this.getStateFromPack(),
                            storage: this.storage,
                            item: item,
                            id: id,
                            type: common_enum_1.MzItemTypeEnum.remove
                        });
                        // }
                        // invoke post action
                        return [4 /*yield*/, this.postRemoveItem(id, packId, item)];
                    case 3:
                        // }
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.postRemoveItem = function (id, packId, item) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.canChangeItem = function (id, item, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.canWriteItem(id, item, common_enum_1.MzItemTypeEnum.change, packId)];
            });
        });
    };
    MzPackAbstractClass.prototype.preChangeItem = function (id, item, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.changeItem = function (id, item, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            var itemIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemIndex = this.allItems.findIndex(function (item) { return item.id === id; });
                        return [4 /*yield*/, this.canChangeItem(id, item, packId)];
                    case 1:
                        if (!((_a.sent()) && itemIndex !== -1)) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preChangeItem(id, item, packId)];
                    case 2:
                        // invoke pre
                        _a.sent();
                        // retranslator
                        this.packsForRetranslator.forEach(function (pack) {
                            pack.changeItem(id, item, packId);
                        });
                        // if (packId === this.id) {
                        // update
                        this.allItems[itemIndex] = { id: id, item: item };
                        // emit
                        this.onChangeItem$.next({
                            packId: this.id,
                            state: this.getStateFromPack(),
                            storage: this.storage,
                            item: item,
                            id: id,
                            type: common_enum_1.MzItemTypeEnum.change
                        });
                        // }
                        // invoke post action
                        return [4 /*yield*/, this.postChangeItem(id, item, packId = this.id)];
                    case 3:
                        // }
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.postChangeItem = function (id, item, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.canWriteItem = function (id, item, typeChage, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    MzPackAbstractClass.prototype.preWriteItem = function (id, item, typeChage, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.writeItem = function (id, item, typeChage, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canWriteItem(id, item, typeChage, packId)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preWriteItem(id, item, typeChage, packId)];
                    case 2:
                        // invoke pre
                        _a.sent();
                        // retranslator
                        this.packsForRetranslator.forEach(function (pack) {
                            pack.writeItem(id, item, typeChage, packId);
                        });
                        // if ( this.id === packId) {
                        // emit
                        this.onWriteItem$.next({
                            packId: this.id,
                            state: this.getStateFromPack(),
                            storage: this.storage,
                            item: item,
                            id: id,
                            type: typeChage
                        });
                        // }
                        // invoke post action
                        return [4 /*yield*/, this.postWriteItem(id, item, typeChage, packId)];
                    case 3:
                        // }
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.postWriteItem = function (id, item, typeChage, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.canChangeState = function (state, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    MzPackAbstractClass.prototype.preChangeState = function (state, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.changeState = function (state, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canChangeState(state, packId)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preChangeState(state, packId)];
                    case 2:
                        // invoke pre
                        _a.sent();
                        // retranslate
                        this.packsForRetranslator.forEach(function (pack) {
                            pack.changeState(state, packId);
                        });
                        // set state current and previous
                        this.state = state.current;
                        this.lastState = state.previous;
                        // invoke post action
                        return [4 /*yield*/, this.postChangeState(state, packId)];
                    case 3:
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.postChangeState = function (state, packId) {
        if (packId === void 0) { packId = this.id; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return MzPackAbstractClass;
}());
exports.MzPackAbstractClass = MzPackAbstractClass;
