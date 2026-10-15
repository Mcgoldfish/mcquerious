export type ExperimentConcept = {
  slug: string;
  title: string;
  category: string;
  question: string;
  description: string;
  theme: 'ruin' | 'detective' | 'auction' | 'ai' | 'banks';
  symbol: string;
  status: 'proposed' | 'step-one' | 'research' | 'investigation' | 'tool';
  topics: readonly string[];
  standaloneHref?: string;
};

// Portfolio projects and planned investigations.
export const experiments: readonly ExperimentConcept[] = [
  {slug:'filing-lens', standaloneHref:'/filing-lens/index.html', title:'Filing Lens', category:'FINANCE · COMPANY REPORTS', question:'Type a topic. Find what companies say about it.', description:'Search real annual-report passages, filter companies and industries, save searches, and open the original PDF page. Current collection: 28 of 100 companies in a Nasdaq-100 reference snapshot.', theme:'ai', symbol:'⌕', status:'tool', topics:['Company disclosures','Text search','Data extraction']},
  {slug:'prediction-lab', title:'The Prediction Lab', category:'DS / MATHS · PREDICTION', question:'Predict first. Can your intuition beat the data?', description:'Lock your predictions, build regression and probability models, then reveal the results and explore overfitting and correlation.', theme:'detective', symbol:'?', status:'step-one', topics:['Regression','Probability','Overfitting','Correlation']},
  {slug:'food-subsidies', standaloneHref:'/subsidizing-competition/index.html', title:'Subsidizing Competition', category:'ECON · RESEARCH', question:'Consumer welfare and market power in China’s food-delivery market.', description:'My original HIR contest essay, awarded Bronze.', theme:'auction', symbol:'¥', status:'research', topics:['Consumer welfare','Network effects','Market power']},
  {slug:'texas-holdem', title:'The Poker Table', category:'DS / MATHS · PROBABILITY', question:'Two cards. A table full of possibilities.', description:'Choose 2–9 players including yourself, play Texas Hold’em against computer opponents, and explore the odds behind each hand.', theme:'ruin', symbol:'♠', status:'step-one', topics:['Probability','Monte Carlo simulation','Strategy']},
  {slug:'stock-playground', title:'One More Trade', category:'FINANCE · MARKETS', question:'Buy. Wait. Sell. Can you catch the next turn?', description:'A fictional stock market with rising and falling trends, random fluctuations and simple buy/sell decisions.', theme:'ai', symbol:'↗', status:'step-one', topics:['Random price paths','Trading decisions','Risk and timing']},
];





