"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.Session = void 0;
var dodi_1 = require("dodi");
var _1 = require(".");
var Session = /** @class */ (function () {
    function Session(props) {
        this._props = props;
        // this._command = command
        this._logger = new _1.Logger(this.props);
        this._workspace = this.props.noWorkspace ? undefined : new _1.Workspace(this.props);
        this._index = new dodi_1.Index(Object.assign({}, { sections: Session.DEFAULT_SECTIONS }, this.props, { name: 'carmel' })); //, this.logger)
    }
    Object.defineProperty(Session.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "logger", {
        get: function () {
            return this._logger;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "workspace", {
        get: function () {
            return this._workspace;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "hasWorkspace", {
        get: function () {
            return !this.props.noWorkspace;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "command", {
        get: function () {
            return this._command;
        },
        enumerable: false,
        configurable: true
    });
    Session.prototype.set = function (key, val) {
        return this.index.sections.main.vault.write(key, val);
    };
    Session.prototype.get = function (key) {
        return this.index.sections.main.vault.read(key);
    };
    Session.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // Initialize the index first of all
                return [2 /*return*/, this.index.initialize()
                        // Make sure the local common deps are available
                        .then(function () { return _this.command && _this.command.requiresFreshSession && _this.updateIndex(); })
                        // Then let's make sure the workspace is also initialized
                        .then(function () { return _this.hasWorkspace && _this.workspace.initialize(); })];
            });
        });
    };
    Session.prototype.updateIndex = function () {
        // this.logger.info('Making sure your development environment is up to date ...')
        var _this = this;
        return this.index.installArchive({ id: "papanache", silent: true })
            .then(function (archive) {
            _this.set("papanacheVersion", archive.version);
            return archive.installDependencies();
        })
            .then(function () { return _this.index.installArchive({ id: "@fluidtrends/bananas", silent: true }); })
            .then(function (archive) {
            _this.set("bananasVersion", archive.version);
            return archive.installDependencies();
        })
            .then(function () {
            // this.logger.info('Your development environment is all up to date')
        });
    };
    Session.prototype.open = function () {
        // Let's setup the logger
        // return this.logger.start(this.command && this.command.title)
    };
    Session.prototype.close = function () {
        // Close this session
        // return this.logger.stop()
    };
    Session.DEFAULT_SECTIONS = [
        { id: "main" },
        { id: "safe", secure: true },
        { id: "archives" },
        { id: "events" },
        { id: "cloud" },
        { id: "products" }
    ];
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=Session.js.map