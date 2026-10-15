"""Export the existing essay text as its own static page."""
from pathlib import Path
from html import escape
import json

root = Path(__file__).resolve().parents[1]
paragraphs = json.loads((root / 'src/experiments/food-subsidies/essay.json').read_text(encoding='utf-8'))
headings = {'The new food-delivery battle', 'The economics behind the losses', 'Regulation and global implications'}
body = '\n'.join(
    f'<h2>{escape(text)}</h2>' if i == 1 else
    f'<h3>{escape(text)}</h3>' if text.strip() in headings else
    f'<p>{escape(text)}</p>'
    for i, text in enumerate(paragraphs)
)
page = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Subsidizing Competition</title><style>
*{box-sizing:border-box}body{margin:0;background:#f6f4ed;color:#273c32;font:16px/1.9 Arial,sans-serif}header{max-width:1000px;margin:auto;padding:25px 30px;display:flex;justify-content:space-between;border-bottom:1px solid #dcded2;gap:20px;font-size:12px}a{color:#385746;text-underline-offset:4px}main{max-width:840px;margin:auto;padding:45px 30px 70px}.label{font-size:10px;letter-spacing:1.8px;color:#777c70}h1{font:42px/1.2 Georgia,serif;margin:18px 0}h2{font:28px/1.5 Georgia,serif}h3{font-size:23px;font-weight:500;margin-top:40px}.subtitle{color:#657064;line-height:1.6}.author{font-size:12px;color:#717b6d}article{margin-top:35px;border-top:1px solid #dcded2;padding-top:25px}article p{margin:0 0 24px}article p:first-child{font-size:12px;color:#777c70}a:focus-visible{outline:3px solid #df805d;outline-offset:5px}@media(max-width:600px){header{padding:20px}main{padding:30px 20px}h1{font-size:32px}h2{font-size:24px}body{font-size:15px}}
</style></head><body><header><a href="../#experiments">← Aureon</a><a href="../research/food-delivery-essay.pdf" download>Download PDF ↓</a></header><main><span class="label">HIR CONTEST · BRONZE</span><h1>Subsidizing Competition</h1><p class="subtitle">Consumer Welfare and Market Power in China’s Food-Delivery Market</p><p class="author">Xu Zheng · Original essay</p><article>''' + body + '</article></main></body></html>'
destination = root / 'public/subsidizing-competition/index.html'
destination.parent.mkdir(parents=True, exist_ok=True)
destination.write_text(page, encoding='utf-8')
print(f'Exported {len(paragraphs)} essay paragraphs.')
