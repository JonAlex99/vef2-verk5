// TODO sækja og setja upp react router

import { Switch, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';

// Lína 16 á að vera Index, ekki NewsPage
export default function App() {
  return (
    <Layout title='RÚV fréttir'>
      <Switch>
        <Route exact path="/">
          <Index /> 
        </Route>
        <Route exact path="/:id" children={<NewsPage />} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}
