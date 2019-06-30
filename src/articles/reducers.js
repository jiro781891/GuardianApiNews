import { ARTICLES_FETCH_BEGIN, ARTICLES_FETCH_ERROR, ARTICLES_FETCH_SUCCESS, ARTICLE_FETCH_SUCCESS, ArticlesAction, ArticlesList } from './actions';

export interface ArticlesState {
    articles: ArticlesList;
    loading: boolean;
    error: boolean;
}

const initialState: ArticlesState = {
    articles: [],
    article: {},
    loading: false,
    error: false
};

export const articles = (state = initialState, action: ArticlesAction): ArticlesState => {
    switch (action.type) {
        case ARTICLES_FETCH_BEGIN:
            return {...initialState, loading: true};
        case ARTICLES_FETCH_SUCCESS:
            return {...initialState, articles: action.articles};
        case ARTICLES_FETCH_ERROR:
            return {...initialState, error: true};
        case ARTICLE_FETCH_SUCCESS:
            return {...initialState, article: action.article};
        default:
            return state;
    }
};
