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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moralis_1 = __importDefault(require("moralis"));
const common_evm_utils_1 = require("@moralisweb3/common-evm-utils");
const express_1 = __importDefault(require("express"));
const Erc20Abi = require('erc-20-abi');
console.log("hello world");
const app = (0, express_1.default)();
const port = 8080; // default port to listen
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world Ethan, this is the root point of webhook subscriber!");
});
app.get("/webhook", (req, res) => {
    res.send("root/webhook");
});
//
// // start the Express server
// app.listen( port, () => {
//     // tslint:disable-next-line:no-console
//     console.log( `server started at http://localhost:${ port }` );
// } );
app.get('/createStream', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // This is basically a trigger
    const stream = yield moralis_1.default.Streams.add({
        webhookUrl: 'https://play.svix.com/in/e_atBF5NfqYCiR1hQeCxrMQjpyvan/',
        // webhookUrl: 'https://130b-2601-646-8500-b0d0-74fc-71a-f89-53b5.ngrok.io/webhook',
        chains: [common_evm_utils_1.EvmChain.ETHEREUM, common_evm_utils_1.EvmChain.POLYGON],
        description: 'Monitor aertoria.eth wallet',
        tag: 'transfers',
        includeContractLogs: true,
        abi: Erc20Abi,
        topic0: ['Transfer(address,address,uint256)'],
        // Now adding topics
        // https://docs.moralis.io/streams-api/filter-streams
        advancedOptions: [
            {
                topic0: 'Transfer(address,address,uint256)',
                filter: {
                    and: [
                        {
                            gt: ["value", "10"]
                        }, {
                            lt: ["value", "20".padEnd(18, "0")]
                        }
                    ]
                }
            }
        ],
    });
    const { id } = stream.toJSON();
    // This is a trigger attachment
    yield moralis_1.default.Streams.addAddress({
        id,
        address: ['0x17d74f13320930106e71a0527cf64d72d61f8d55']
    });
    return res.status(200).json(stream);
}));
app.post('/webhook', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("aertoria called" + req.body);
    // console.log(req.body);
    const webhook = req.body;
    for (const erc20Transfer of webhook.erc20Transfers) {
        console.log('Aertoria Logging...');
        console.log(erc20Transfer.tokenName, erc20Transfer.valueWithDecimals, erc20Transfer);
    }
}));
// Moralis, that listens 5000
moralis_1.default.start({
    apiKey: 'J7DfONwJZT9nsdr7xzbkiEZQ9jqiWQsUSJx8mCVkT6hUSJQq3PeoMD2A8UlVQith'
}).then(() => {
    app.listen(5001, () => {
        console.log('App started in 5001');
    });
});
//# sourceMappingURL=index.js.map