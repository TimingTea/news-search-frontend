/* eslint-disable max-len */
import './styles/index.css';
import './styles/blocks/header/header';
import './styles/blocks/searh/searh';

import Storage from './js/components/Storage';

import MainApi from './js/api/MainApi';
import MAIN_API from './js/constants/main-api';

import NewsApi from './js/api/NewsApi';
import NEWS_API from './js/constants/news-api';

import Page from './js/components/Page';

import Validation from './js/components/Validation';
import ERRORS from './js/constants/errors';

import Header from './js/components/Header';
import HEADER from './js/constants/header';

import Search from './js/components/Search';
import SEARCH from './js/constants/search';

import NotFound from './js/components/NotFound';
import NOT_FOUND from './js/constants/not-found';

import RequestError from './js/components/RequestError';
import REQUEST_ERROR from './js/constants/request-error';

import Preloader from './js/components/Preloader';
import PRELOADER from './js/constants/preloader';

import ArticlesBlock from './js/components/ArticlesBlock';
import ARTICLES_BLOCK from './js/constants/articles-block';

import ArticleCard from './js/components/ArticleCard';
import ARTICLE_CARD from './js/constants/article-card';

import PopupReg from './js/components/PopupReg';
import POPUP_REG from './js/constants/popup-reg';

import PopupAuth from './js/components/PopupAuth';
import POPUP_AUTH from './js/constants/popup-auth';

import PopupSuccess from './js/components/PopupSuccess';
import POPUP_SUCCESS from './js/constants/popup-success';


import redirectTo from './js/utils/redirect';
import checkImageUrl from './js/utils/images';
import deleteListTags from './js/utils/list-tags';
import dates from './js/utils/dates';
import MONTHS from './js/constants/months';
import articleProps from './js/utils/article-props';


// import from '';
// import from '';
// import from '';
// import from '';
// import from '';


// eslint-disable-next-line no-undef
const storage = new Storage(sessionStorage);

const mainApi = new MainApi(MAIN_API);

const newsApi = new NewsApi(NEWS_API);

const page = new Page();

const validation = new Validation(ERRORS.ru);

const header = new Header(HEADER);

const search = new Search(SEARCH);

const notFound = new NotFound(NOT_FOUND);

const requestError = new RequestError(REQUEST_ERROR);

const preloader = new Preloader(PRELOADER);

const articlesBlock = new ArticlesBlock(ARTICLES_BLOCK);

const articleCard = new ArticleCard(ARTICLE_CARD);

const popupReg = new PopupReg(POPUP_REG);

const popupAuth = new PopupAuth(POPUP_AUTH);

const popupSuccess = new PopupSuccess(POPUP_SUCCESS);

newsApi.dependencies({ dates });

page.dependencies({
  name: 'main',
  header,
  redirectTo,
  articlesBlock,
  notFound,
  mainApi,
  storage,
  search,
  popupAuth,
  popupReg,
  popupSuccess,
});

header.dependencies({
  popupAuth, mainApi, redirectTo, storage,
});

search.dependencies({
  articlesBlock, notFound, preloader, requestError, newsApi, storage, validation,
});

articleCard.dependencies({
  checkImageUrl, dates, deleteListTags, MONTHS, articleProps, storage, mainApi,
});

articlesBlock.dependencies({ storage, articleCard });
popupReg.dependencies({
  validation,
  popupAuth,
  mainApi,
  popupSuccess,
});

popupAuth.dependencies({
  validation,
  popupReg,
  mainApi,
  header,
  storage,
});

popupSuccess.dependencies({
  popupAuth,
});

page.fillBlocks();
