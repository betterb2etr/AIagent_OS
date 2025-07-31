"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __typia_transform__validateReport = __importStar(require("typia/lib/internal/_validateReport.js"));
// src/main.ts
const core_1 = require("@agentica/core");
const openai_1 = require("openai");
const tools_1 = require("./tools");
const typia_1 = __importDefault(require("typia"));
const readline_1 = __importDefault(require("readline"));
const dotenv_1 = __importDefault(require("dotenv"));
// .env 파일을 불러온다.
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // OpenAI를 정의
        const openai = new openai_1.OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        // Agentica를 사용하여 agent를 생성한다.
        const agent = new core_1.Agentica({
            model: "chatgpt",
            vendor: {
                model: "gpt-4o-mini",
                api: openai,
            },
            // Controller에 Tool을 입력할 수 있다.
            controllers: [
                {
                    name: "Date Tool", // 컨트롤러 이름 설정
                    protocol: "class", // 형식 설정. http, class가 존재한다.
                    application: {
                        model: "chatgpt",
                        options: {
                            reference: true,
                            strict: false,
                            separate: null
                        },
                        functions: [
                            {
                                name: "getToday",
                                parameters: {
                                    type: "object",
                                    properties: {},
                                    additionalProperties: false,
                                    required: [],
                                    $defs: {}
                                },
                                output: {
                                    type: "string"
                                },
                                description: "DateTool.\nReturns the current date.",
                                validate: (() => { const __is = input => true; let errors; let _report; return input => {
                                    if (false === __is(input)) {
                                        errors = [];
                                        _report = __typia_transform__validateReport._validateReport(errors);
                                        ((input, _path, _exceptionable = true) => true)(input, "$input", true);
                                        const success = 0 === errors.length;
                                        return success ? {
                                            success,
                                            data: input
                                        } : {
                                            success,
                                            errors,
                                            data: input
                                        };
                                    }
                                    return {
                                        success: true,
                                        data: input
                                    };
                                }; })()
                            },
                            {
                                name: "setToday",
                                parameters: {
                                    type: "object",
                                    properties: {
                                        date: {
                                            description: "date format : \"YYYY-MM-DD\"",
                                            type: "string"
                                        }
                                    },
                                    required: [
                                        "date"
                                    ],
                                    additionalProperties: false,
                                    $defs: {}
                                },
                                description: "DateTool.\nSets the current date.",
                                validate: (() => { const _io0 = input => "string" === typeof input.date; const _vo0 = (input, _path, _exceptionable = true) => ["string" === typeof input.date || _report(_exceptionable, {
                                        path: _path + ".date",
                                        expected: "string",
                                        value: input.date
                                    })].every(flag => flag); const __is = input => "object" === typeof input && null !== input && _io0(input); let errors; let _report; return input => {
                                    if (false === __is(input)) {
                                        errors = [];
                                        _report = __typia_transform__validateReport._validateReport(errors);
                                        ((input, _path, _exceptionable = true) => ("object" === typeof input && null !== input || _report(true, {
                                            path: _path + "",
                                            expected: "__type",
                                            value: input
                                        })) && _vo0(input, _path + "", true) || _report(true, {
                                            path: _path + "",
                                            expected: "__type",
                                            value: input
                                        }))(input, "$input", true);
                                        const success = 0 === errors.length;
                                        return success ? {
                                            success,
                                            data: input
                                        } : {
                                            success,
                                            errors,
                                            data: input
                                        };
                                    }
                                    return {
                                        success: true,
                                        data: input
                                    };
                                }; })()
                            }
                        ]
                    }, // OpenAI Function Schema가 들어간다.
                    execute: new tools_1.DateTool(), // OpenAI Function Schema의 구현체가 들어간다. application에 입력된 OpenAI Function Schema를 토대로, excute의 구현체의 함수를 실행한다.
                },
                {
                    name: "Weather Tool",
                    protocol: "class",
                    application: {
                        model: "chatgpt",
                        options: {
                            reference: true,
                            strict: false,
                            separate: null
                        },
                        functions: [
                            {
                                name: "getTodayWeather",
                                parameters: {
                                    type: "object",
                                    properties: {
                                        today: {
                                            description: "date format : \"YYYY-MM-DD\"",
                                            type: "string"
                                        }
                                    },
                                    required: [
                                        "today"
                                    ],
                                    additionalProperties: false,
                                    $defs: {}
                                },
                                output: {
                                    type: "string"
                                },
                                description: "WeatherTool.\nReturns the weather of the given year.",
                                validate: (() => { const _io0 = input => "string" === typeof input.today; const _vo0 = (input, _path, _exceptionable = true) => ["string" === typeof input.today || _report(_exceptionable, {
                                        path: _path + ".today",
                                        expected: "string",
                                        value: input.today
                                    })].every(flag => flag); const __is = input => "object" === typeof input && null !== input && _io0(input); let errors; let _report; return input => {
                                    if (false === __is(input)) {
                                        errors = [];
                                        _report = __typia_transform__validateReport._validateReport(errors);
                                        ((input, _path, _exceptionable = true) => ("object" === typeof input && null !== input || _report(true, {
                                            path: _path + "",
                                            expected: "__type",
                                            value: input
                                        })) && _vo0(input, _path + "", true) || _report(true, {
                                            path: _path + "",
                                            expected: "__type",
                                            value: input
                                        }))(input, "$input", true);
                                        const success = 0 === errors.length;
                                        return success ? {
                                            success,
                                            data: input
                                        } : {
                                            success,
                                            errors,
                                            data: input
                                        };
                                    }
                                    return {
                                        success: true,
                                        data: input
                                    };
                                }; })()
                            }
                        ]
                    },
                    execute: new tools_1.WeatherTool(),
                },
            ],
        });
        // 터미널에서 대화를 주고받기 위한 readline interface 생성
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        // Agent와 대화하는 함수.
        const conversation = () => {
            rl.question("User Input (exit: q) : ", (input) => __awaiter(this, void 0, void 0, function* () {
                // q를 입력하면 대화가 종료.
                if (input === "q") {
                    rl.close();
                    return;
                }
                const answers = yield agent.conversate(input);
                // Agent의 답변을 console.log한다.
                answers.forEach((answer) => {
                    console.log(JSON.stringify(answer, null, 2));
                });
                // 대화를 지속할 수 있도록 재귀호출.
                conversation();
            }));
        };
        conversation();
    });
}
main().catch(console.error);
