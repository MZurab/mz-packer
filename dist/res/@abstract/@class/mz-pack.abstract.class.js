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
        //@< ADD ITEM
        this.onAddItem$ = new rxjs_1.Subject();
        this.onBindedAddItem$ = new rxjs_1.Subject();
        //@> ADD ITEM
        //@< REMOVE ITEM
        this.onRemoveItem$ = new rxjs_1.Subject();
        this.onBindedRemoveItem$ = new rxjs_1.Subject();
        //@> REMOVE ITEM
        //@< CHANGE ITEM
        this.onChangeItem$ = new rxjs_1.Subject();
        this.onBindedChangeItem$ = new rxjs_1.Subject();
        //@> CHANGE ITEM
        //@< WRITE ITEM
        this.onWriteItem$ = rxjs_1.Observable.create();
        this.onBindedWriteItem$ = rxjs_1.Observable.create(); // : <MzInputAction>
        //@> WRITE ITEM
        //@< CHANGE STATE
        this.onChangeState$ = rxjs_1.Observable.create();
        this.onBindedChangeState$ = rxjs_1.Observable.create(); // : <MzInputAction>
        //@> CHANGE STATE
    }
    MzPackAbstractClass.prototype.getStateFromPack = function (newState) {
        return {
            current: (newState) ? newState : this.state,
            previous: (newState) ? this.state : this.lastState
        };
    };
    MzPackAbstractClass.prototype.canAddItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.canWriteItem(id, item, common_enum_1.MzItemTypeEnum.add)];
            });
        });
    };
    MzPackAbstractClass.prototype.preAddItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.addItem = function (id, item, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canAddItem(id, item)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preAddItem(id, item)];
                    case 2:
                        // invoke pre
                        _a.sent();
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
                        return [4 /*yield*/, this.postAddItem(id, item)];
                    case 3:
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.postAddItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.canRemoveItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.canWriteItem(id, item, common_enum_1.MzItemTypeEnum.remove)];
            });
        });
    };
    MzPackAbstractClass.prototype.preRemoveItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.removeItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canRemoveItem(id, item)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preRemoveItem(id, item)];
                    case 2:
                        // invoke pre
                        _a.sent();
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
                        // invoke post action
                        return [4 /*yield*/, this.postRemoveItem(id, item)];
                    case 3:
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.postRemoveItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.canChangeItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.canWriteItem(id, item, common_enum_1.MzItemTypeEnum.change)];
            });
        });
    };
    MzPackAbstractClass.prototype.preChangeItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.changeItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var itemIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemIndex = this.allItems.findIndex(function (item) { return item.id === id; });
                        return [4 /*yield*/, this.canChangeItem(id, item)];
                    case 1:
                        if (!((_a.sent()) && itemIndex !== -1)) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preChangeItem(id, item)];
                    case 2:
                        // invoke pre
                        _a.sent();
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
                        // invoke post action
                        return [4 /*yield*/, this.postChangeItem(id, item)];
                    case 3:
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.postChangeItem = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.canWriteItem = function (id, item, typeChage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    MzPackAbstractClass.prototype.preWriteItem = function (id, item, typeChage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.postWriteItem = function (id, item, typeChage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.canChangeState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    MzPackAbstractClass.prototype.preChangeState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MzPackAbstractClass.prototype.changeState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canChangeState(state)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        // invoke pre
                        return [4 /*yield*/, this.preChangeState(state)];
                    case 2:
                        // invoke pre
                        _a.sent();
                        // set state current and previous
                        this.state = state.current;
                        this.lastState = state.previous;
                        // invoke post action
                        return [4 /*yield*/, this.postChangeState(state)];
                    case 3:
                        // invoke post action
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MzPackAbstractClass.prototype.postChangeState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return MzPackAbstractClass;
}());
exports.MzPackAbstractClass = MzPackAbstractClass;
