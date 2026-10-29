import {useEffect, useState, type ComponentType} from 'react';
import {ProjectHeader} from './components/ProjectHeader';
import {SiteLayout} from './components/SiteLayout';
import {Home, Explore} from './pages/Home';
import {Concept} from './pages/Concept';
import {experiments} from './experiments/registry';
import FilingLens from './experiments/filing-lens/FilingLens';
import {RepositoryProject} from './components/RepositoryProject';

export default function App() {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    const sync = () => setHash(location.hash);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const exploring = hash === '#/explore' || hash === '#experiments' || hash === '#about';
  const slug = hash.startsWith('#/experiments/') ? hash.slice('#/experiments/'.length) : null;
  const experiment = experiments.find(item => item.slug === slug);
  useEffect(() => {
    document.title = experiment ? `${experiment.title} — McQuerious` : 'McQuerious — Big ideas. Small experiments.';
    if (slug || hash === '#/explore' || hash === '#' || !hash) window.scrollTo(0, 0);
    else if (hash === '#experiments' || hash === '#about') {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    }
  }, [hash, experiment, slug]);
  const projectPages: Record<string, ComponentType> = {
    'filing-lens': FilingLens,
  };
  if ((experiment?.repositoryHref && slug !== 'filing-lens') || (slug === 'filing-lens-project')) {
    const details = experiment ?? experiments.find(item => item.slug === 'filing-lens')!;
    return <SiteLayout><RepositoryProject experiment={details}/></SiteLayout>;
  }
  const Project = slug ? projectPages[slug] : undefined;
  if (Project) {
    const details = experiment!;
    return <><ProjectHeader title={details.title} category={details.category.split(' · ')[0]} standaloneHref={details.standaloneHref}/><Project/></>;
  }
  return <SiteLayout flight={!experiment && !slug && !exploring}>{experiment ? <Concept experiment={experiment}/> : slug ? <main className="concept"><p className="eyebrow">WORLD NOT FOUND</p><h1>Still unexplored.</h1><a className="primary" href="#/explore">Back to the ideas →</a></main> : exploring ? <Explore/> : <Home/>}</SiteLayout>;
}



