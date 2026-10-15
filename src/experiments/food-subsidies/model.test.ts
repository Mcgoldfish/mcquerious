import {test} from 'node:test';
import assert from 'node:assert/strict';
import {simulate,defaults} from './model';
test('no coupons create no consumer savings or operating losses',()=>{const rows=simulate({...defaults,coupon:0});assert.ok(rows.every(r=>r.savings===0&&r.loss===0&&r.price===20));});
test('funding bounds expenses, shares and prices, and exits persist',()=>{for(const funding of [20,120,300])for(const coupon of [0,6,12])for(const network of [0,0.5,1]){const rows=simulate({funding,coupon,network,duration:24});for(const r of rows){assert.ok(r.balance>=0&&r.share>=0&&r.share<=1&&r.price>=8&&r.price<=20);assert.ok(r.loss<=funding+1e-8);}const exit=rows.findIndex(r=>!r.active);if(exit>=0)assert.ok(rows.slice(exit).every(r=>r.share===0&&!r.active));}});
test('discounts end on schedule and outputs reproduce',()=>{const rows=simulate({...defaults,duration:3,funding:300});assert.equal(rows[4].price,20);assert.equal(rows[4].savings,rows[3].savings);assert.deepEqual(rows,simulate({...defaults,duration:3,funding:300}));});
