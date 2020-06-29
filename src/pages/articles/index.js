/* eslint-disable no-undef */
/* eslint-disable max-len */
import './index.css';
import Storage from '../../js/components/Storage';

import MainApi from '../../js/api/MainApi';
import MAIN_API_OPTIONS from '../../js/constants/main-api';

import Header from '../../js/components/Header';
import HEADER_OPTIONS from '../../js/constants/header';

import Inform from '../../js/components/Inform';
import INFORM_OPTIONS from '../../js/constants/inform';

import Page from '../../js/components/Page';

import ArticlesBlock from '../../js/components/ArticlesBlock';
import ARTICLES_BLOCK_OPTIONS from '../../js/constants/articles-block';

import ArticleCard from '../../js/components/ArticleCard';
import ARTICLE_CARD_OPTIONS from '../../js/constants/article-card';

import NotFound from '../../js/components/NotFound';
import NOT_FOUND_OPTIONS from '../../js/constants/not-found';

import redirectTo from '../../js/utils/redirect';
import checkImageUrl from '../../js/utils/images';
import deleteListTags from '../../js/utils/list-tags';
import dates from '../../js/utils/dates';
import MONTHS from '../../js/constants/months';
import articleProps from '../../js/utils/article-props';

const storage = new Storage(sessionStorage);

const mainApi = new MainApi(MAIN_API_OPTIONS);

const page = new Page();

const header = new Header(HEADER_OPTIONS);

const inform = new Inform(INFORM_OPTIONS);

const notFound = new NotFound(NOT_FOUND_OPTIONS);

const articlesBlock = new ArticlesBlock(ARTICLES_BLOCK_OPTIONS);

const articleCard = new ArticleCard(ARTICLE_CARD_OPTIONS);

page.dependencies({
  name: 'saved',
  header,
  redirectTo,
  articlesBlock,
  notFound,
  mainApi,
  storage,
  inform,
});

header.dependencies({ mainApi, redirectTo, storage });

articleCard.dependencies({
  checkImageUrl, dates, deleteListTags, MONTHS, articleProps, storage, mainApi,
});

articlesBlock.dependencies({ storage, articleCard });

inform.dependencies({ storage });

page.fillBlocks();
