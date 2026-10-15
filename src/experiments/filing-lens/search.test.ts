import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import {gunzipSync} from 'node:zlib';

type SearchMessage = {type: string; total?: number; results?: {ticker: string}[]};
const source = readFileSync('public/filing-lens/search-worker.js', 'utf8');
const compressed = readFileSync('public/filing-lens/reports.json.gz');

for (const transport of ['gzip', 'already decoded'] as const) {
  test(`report search loads ${transport} data and returns company-filtered passages`, async () => {
    const messages: SearchMessage[] = [];
    const bytes = transport === 'gzip' ? compressed : gunzipSync(compressed);
    const context = vm.createContext({
      fetch: async () => new Response(Uint8Array.from(bytes)),
      Response, Blob, DecompressionStream, TextDecoder, Uint8Array, performance,
      postMessage: (message: SearchMessage) => messages.push(message),
    });
    vm.runInContext(source, context);
    await vm.runInContext("onmessage({data:{type:'load'}})", context);
    assert.equal(messages.at(-1)?.type, 'ready');
    await vm.runInContext("onmessage({data:{type:'search',id:1,query:'supply chain',company:'AAPL',sort:'relevance'}})", context);
    const result = messages.at(-1);
    assert.equal(result?.type, 'results');
    assert.ok((result?.total ?? 0) > 0);
    assert.ok(result?.results?.every(row => row.ticker === 'AAPL'));
    await vm.runInContext("onmessage({data:{type:'search',id:2,query:'no-match-94813721',sort:'relevance'}})", context);
    assert.equal(messages.at(-1)?.total, 0);
  });
}
