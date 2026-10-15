import {useEffect, useState, type ComponentType} from 'react';
import {ProjectHeader} from './components/ProjectHeader';
import {SiteLayout} from './components/SiteLayout';
import {Home} from './pages/Home';
import {Concept} from './pages/Concept';
import {experiments} from './experiments/registry';
import Holdem from './experiments/holdem/Holdem';
import StockPlayground from './experiments/stock-playground/StockPlayground';
import FoodSubsidies from './experiments/food-subsidies/FoodSubsidies';
import PredictionLab from './experiments/prediction-lab/PredictionLab';
import FilingLens from './experiments/filing-lens/FilingLens';

export default function App() {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    const sync = () => setHash(location.hash);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const slug = hash.startsWith('#/experiments/') ? hash.slice('#/experiments/'.length) : null;
  const experiment = experiments.find(item => item.slug === slug);
  useEffect(() => {
    document.title = experiment ? `${experiment.title} — McQuerious` : 'McQuerious — Big ideas. Small experiments.';
    if (slug) window.scrollTo(0, 0);
    else if (hash === '#experiments' || hash === '#about') {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    }
  }, [hash, experiment, slug]);
  const projectPages: Record<string, ComponentType> = {
    'filing-lens': FilingLens,
    'prediction-lab': PredictionLab,
    'texas-holdem': Holdem,
    'food-subsidies': FoodSubsidies,
    'stock-playground': StockPlayground,
    'market-discovery': StockPlayground,
  };
  const Project = slug ? projectPages[slug] : undefined;
  if (Project) {
    const details = experiment ?? experiments.find(item => item.slug === 'stock-playground')!;
    return <><ProjectHeader title={details.title} category={details.category.split(' · ')[0]} standaloneHref={details.standaloneHref}/><Project/></>;
  }
  return <SiteLayout>{experiment ? <Concept experiment={experiment}/> : slug ? <main className="concept"><p className="eyebrow">WORLD NOT FOUND</p><h1>Still unexplored.</h1><a className="primary" href="#experiments">Back to the ideas →</a></main> : <Home/>}</SiteLayout>;
}


