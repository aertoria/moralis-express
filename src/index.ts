import Moralis from 'moralis';
import { EvmChain } from "@moralisweb3/common-evm-utils";
import express from "express";
import {Types} from "@moralisweb3/streams";

const Erc20Abi = require('erc-20-abi');

console.log("hello world");

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world Ethan, this is the root point of webhook subscriber!" );
} );
app.get( "/webhook", ( req, res ) => {
    res.send( "root/webhook" );
} );

//
// // start the Express server
// app.listen( port, () => {
//     // tslint:disable-next-line:no-console
//     console.log( `server started at http://localhost:${ port }` );
// } );


app.get('/createStream', async(req, res)=>{

    // This is basically a trigger
    const stream = await Moralis.Streams.add({
        webhookUrl: 'https://play.svix.com/in/e_atBF5NfqYCiR1hQeCxrMQjpyvan/',

        // webhookUrl: 'https://130b-2601-646-8500-b0d0-74fc-71a-f89-53b5.ngrok.io/webhook',
        chains: [EvmChain.ETHEREUM, EvmChain.POLYGON],
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
                    and : [
                        {
                            gt: ["value", "10"]
                        },{
                            lt: ["value","20".padEnd(18,"0")]
                        }
                    ]
                }
            }
        ],
    })

    const{id} = stream.toJSON()

    // This is a trigger attachment
    await Moralis.Streams.addAddress({
        id,
        // Dummy testing address
        address:['0x17d74f13320930106e71a0527cf64d73d61f8d56']
    })
    return res.status(200).json(stream)
})


app.post('/webhook', async(req, res) => {
    // console.log("aertoria called" + req.body);
    // console.log(req.body);

    const webhook:Types.IWebhook = req.body;
    for(const erc20Transfer of webhook.erc20Transfers){
        console.log('Aertoria Logging...');
        console.log(erc20Transfer.tokenName, erc20Transfer.valueWithDecimals,erc20Transfer);
    }
})



// Moralis, that listens 5000
Moralis.start({
    apiKey : '<API KEY>'
}).then(()=>{
    app.listen(5001, () => {
        console.log('App started in 5001')
    })
});