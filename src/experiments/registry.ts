export type ExperimentConcept = {
  slug: string;
  title: string;
  category: string;
  contentType: 'Projects' | 'Interactives' | 'Documents';
  field: 'Econ' | 'DS' | 'Finance';
  question: string;
  description: string;
  theme: 'ruin' | 'detective' | 'auction' | 'ai' | 'banks';
  symbol: string;
  status: 'proposed' | 'step-one' | 'research' | 'investigation' | 'tool' | 'constructing';
  topics: readonly string[];
  standaloneHref?: string;
  repositoryHref?: string;
  liveHref?: string;
  repositoryReady?: boolean;
};

// Portfolio projects and planned investigations.
export const experiments: readonly ExperimentConcept[] = [
  {slug:'elixir-quant', liveHref:'https://mcgoldfish.github.io/elixirquant/', contentType:'Projects', field:'Finance', repositoryHref:'https://github.com/Mcgoldfish/elixirquant', repositoryReady:true, title:'Elixir Quant', category:'FINANCE · QUANTITATIVE RESEARCH', question:'From an idea to an experiment.', description:'Test simple or custom trading rules on historical Nasdaq-100 stock prices, choose dates, and compare equity and drawdown with interactive charts. This public edition demonstrates the research workflow; proprietary strategies are maintained separately.', theme:'ai', symbol:'↗', status:'tool', topics:['Nasdaq-100 stocks','Backtesting','Risk and performance']},
  {slug:'filing-lens', liveHref:'https://mcgoldfish.github.io/filinglens/', repositoryHref:'https://github.com/Mcgoldfish/filinglens', repositoryReady:true, contentType:'Projects', field:'Finance', standaloneHref:'/filing-lens/index.html', title:'Filing Lens', category:'FINANCE · COMPANY REPORTS', question:'Type a topic. Find what companies say about it.', description:'Search real annual-report passages, filter companies and industries, save searches, and open the original PDF page. Current collection: 28 of 100 companies in a Nasdaq-100 reference snapshot.', theme:'ai', symbol:'⌕', status:'tool', topics:['Company disclosures','Text search','Data extraction']},
  {slug:'unlayer', liveHref:'https://mcgoldfish.github.io/unlayer/', repositoryHref:'https://github.com/Mcgoldfish/unlayer', repositoryReady:true, contentType:'Projects', field:'DS', title:'Unlayer', category:'DS · MUSIC & AUDIO', question:'Hear the layers inside a song.', description:'Separate a recording into vocals, drums, bass and other directly in your browser. Explore synchronized waveforms, solo or mute each part, export a mix, and inspect RMS levels and sample peak.', theme:'ai', symbol:'≋', status:'tool', topics:['Source separation','Audio signals','Browser AI']},
  {slug:'pricehunter', contentType:'Projects', field:'DS', title:'PriceHunter', category:'DS · PRICE TRACKING', question:'Follow products. Understand their prices.', description:'Constructing', theme:'ai', symbol:'⌕', status:'constructing', topics:['Product data','Price tracking','Statistics']},
  {slug:'common-poker', liveHref:'https://poker.moreallure.work/', contentType:'Projects', field:'DS', title:'Common Poker', category:'DS · MULTIPLAYER POKER', question:'A poker table for friends.', description:'Play multiplayer Texas Hold’em with two to four people using play chips.', theme:'ruin', symbol:'♠', status:'tool', topics:['Multiplayer','Texas Hold’em','Play chips'], repositoryHref:'https://github.com/Moreallure/common-poker', repositoryReady:true},
];






