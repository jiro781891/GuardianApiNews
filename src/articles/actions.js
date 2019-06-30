import axios from 'axios';
import { articlesApiUrl, apiUrl } from './constants';
import { Action, Dispatch } from 'redux';

export const ARTICLES_FETCH_BEGIN = 'ARTICLES_FETCH_BEGIN';
export const ARTICLES_FETCH_SUCCESS = 'ARTICLES_FETCH_SUCCESS';
export const ARTICLES_FETCH_ERROR = 'ARTICLES_FETCH_ERROR';
export const ARTICLE_FETCH_SUCCESS = 'ARTICLE_FETCH_SUCCESS';
export const ADD_STORAGE_ITEM = 'ADD_STORAGE_ITEM';

export interface Article {
    id: string;
    webTitle: string;
}

export type ArticlesList = Article[];

export interface ArticlesAction extends Action {
    articles: ArticlesList;
}

// Internal action creators
const articlesFetchBegin = () => {
    return {
        type: ARTICLES_FETCH_BEGIN
    };
};

const articlesFetchSuccess = (articles: ArticlesList) => {
    return {
        type: ARTICLES_FETCH_SUCCESS,
        articles
    };
};

const articlesFetchError = () => {
    return {
        type: ARTICLES_FETCH_ERROR
    };
};

const articleFetchSuccess = (article: Article) => {
    return {
        type: ARTICLE_FETCH_SUCCESS,
        article
    };
};

export const addValueToStorage = () => {
    return {
        type: ADD_STORAGE_ITEM,
    };
};


// Action creator that returns function (thunk) instead of an action
// Will be processed by `redux-thunk` middleware
export const articlesFetch = (limit = 10) => (dispatch: Dispatch<ArticlesAction>) => {

    // API request will be executed...
    // if (limit === 10) {
      // dispatch(articlesFetchBegin());
    // }

    // ...now
    return axios.get(articlesApiUrl + '&page-size=' + limit)
        .then((response: { data: ArticlesList }) => {

            dispatch(articlesFetchSuccess(response.data.response.results));
        })
        .catch(() => {

            dispatch(articlesFetchError());
        });
};

export const articleFetch = (id) => (dispatch: Dispatch<ArticlesAction>) => {

    // API request will be executed...

      dispatch(articlesFetchBegin());

    // ...now
    return axios.get(apiUrl + id.replace(/%2F/g, '/') + '?api-key=test&show-fields=thumbnail,bodyText')
        .then((response: { data: ArticlesList }) => {

            dispatch(articleFetchSuccess(response.data.response.content));
        })
        .catch(() => {

            dispatch(articlesFetchError());
        });
};
