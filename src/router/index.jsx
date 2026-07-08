import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Category from '../pages/Category/Category';
import NewReleases from '../pages/NewReleases/NewReleases';
import GameDetail from '../pages/GameDetail/GameDetail';
import SearchPage from '../pages/Search/Search';
import NotFound from '../pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'category/:catId', element: <Category /> },
      { path: 'new-releases', element: <NewReleases /> },
      { path: 'game/:id', element: <GameDetail /> },
      { path: 'search', element: <SearchPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
