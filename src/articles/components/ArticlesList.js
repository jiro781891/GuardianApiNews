import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ArticlesAction, articlesFetch } from '../actions';
import { MainState } from '../../index';
import { ArticlesState } from '../reducers';
import { ArticleItem } from './ArticleItem';
import debounce from 'lodash.debounce';
import CustomizedSnackbars from './SnackBar'

import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
// import equal from 'fast-deep-equal'
// State interface (not internal component state)
// TODO: Form state can be probably partially based on `redux-form` interfaces, but I can't find proper one
interface StateProps {
    articlesState: ArticlesState;
    formState: {
        articlesSearch: {
            values?: {
                phrase: string;
            }
        }
    };
}

// Actions interface
interface DispatchProps {
    articlesFetch: typeof articlesFetch;
}

// Component interface
interface Props extends StateProps, DispatchProps {}

const styles = (theme => ({
  root: {
    display: 'grid',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(12),
  },
  gridList: {
    width: 800,
    height: 'auto',
    transform: 'translateZ(0)',
    },
  }))

class ArticlesList extends React.Component<Props, {}> {
    constructor(props){
      super(props)
      this.state = {
        limit: 10,
        newPosts: null
      }
      this.child = React.createRef();


      window.onscroll = debounce(() => {
        // Checks that the page has scrolled to the bottom
        if (
          window.innerHeight + document.documentElement.scrollTop
          === document.documentElement.offsetHeight
        ) {
          this.setState({
            limit: this.state.limit + 10
          }, () => this.props.articlesFetch(this.state.limit));

        }
      }, 100);

      this.scrollTop = () => {
        window.scrollTo(0, 0);
      }
    }


    componentDidMount() {
      var self = this;
      self.props.articlesFetch();
      self.interval = setInterval(function(){
        self.props.articlesFetch(); },
        30000)

    }

    shouldComponentUpdate(nextProps) {
      // TODO This part can be done by more clear way.

      var articles = this.props.articlesState.articles;
      var next_articles = nextProps.articlesState.articles;

      if (next_articles.length === 0){
        return false
      }

      else if (articles.length < next_articles.length)
        return true

      else if ( articles.length && next_articles.length && articles[0].webTitle === next_articles[0].webTitle){
        return false
      }

      else if ( articles.length && next_articles.length && articles[0].webTitle !== next_articles[0].webTitle){
        this.child.current.handleOpen()
        for (var i = 0; i < articles.length; i++){
          if(articles[i].webTitle === next_articles[i].webTitle)
          this.setState({
            newPosts: i
          })
          break
        }

        return true
      }
      return true
    }


    // If the render method will be too long (at some point in the future)
    // it should be sliced to multiple methods like `renderLoading`, `renderError`, `renderList` etc.
    render() {

        const {props} = this;
        const {classes} = this.props;
        const articles = props.articlesState.articles;

        var viewed_articles_list = JSON.parse(window.localStorage.getItem('viewed_articles_list')) || [];
        var pinned_articles_list = JSON.parse(window.localStorage.getItem('pinned_articles_list')) || [];

        // Articles are loading
        if (props.articlesState.loading || !articles.length) {
            return <div>Loading...</div>;
        }

        // There's an error during fetching API
        else if (props.articlesState.error) {
            return <div>Sorry, there's an error during fetching data</div>;
        }

        // List articles
        if (articles.length) {

          return (
            <div className={classes.root}>
              <CustomizedSnackbars ref={this.child} scrollTop={this.scrollTop}/>
              <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                {articles.map((article, index) => (
                  <ArticleItem key={article.id} article={article} index={index}
                    viewed_articles_list={viewed_articles_list}
                    pinned_articles_list={pinned_articles_list} {...props} newPost={index <= this.state.newPosts}/>)
                  )}
                </GridList>
              </div>
                )
        }

        return <div>Oops, no articles available</div>;
    }
}

// Provide access to state
const mapStateToProps = (state: MainState) => ({
    articlesState: state.articles,
    formState: state.form
});

// Provide access to dispatching actions
const mapDispatchToProps = (dispatch: Dispatch<ArticlesAction>) => ({
    ...bindActionCreators({articlesFetch}, dispatch)
});

// Connect mappers with component
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ArticlesList));
