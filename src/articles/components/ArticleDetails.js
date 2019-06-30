import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ArticlesAction, articleFetch } from '../actions';
import { MainState } from '../../index';
import { ArticlesState } from '../reducers';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    paddingTop: '10%'
  },
  articleImage:{
    width: '-webkit-fill-available'
  },
  sectionPadding:{
    paddingBottom: theme.spacing(5)
  },
  removeUnderLine:{
    textDecoration: 'none'
  }
  }))

class ArticleDetails extends React.Component<Props, {}> {

    componentDidMount() {
        this.props.articleFetch(this.props.match.url);
    }

    // If the render method will be too long (at some point in the future)
    // it should be sliced to multiple methods like `renderLoading`, `renderError`, `renderList` etc.
    render() {

        const {props} = this;
        const {classes} = this.props;
        const article = props.articlesState.article;

        // Articles are loading
        if (props.articlesState.loading) {
            return <div>Loading...</div>;
        }

        // There's an error during fetching API
        else if (props.articlesState.error) {
            return <div>Sorry, there's an error during fetching data</div>;
        }

        // List articles
        if (article.fields) {

          var dateObject = new Date(Date.parse(article.webPublicationDate));

          return (
            <div className={classes.root}>

              <Grid container justify='center' className={classes.sectionPadding}>
                <Grid item xs={6}>
                    <Typography variant="h4">{article.webTitle}</Typography>
                    <Typography variant="overline">Section: {article.sectionName} || Publishing Date: {dateObject.toDateString()} || <a href={article.webUrl} className={classes.removeUnderLine}>Read from original resourse </a></Typography>
                </Grid>
              </Grid>

              <Grid container justify='center' className={classes.sectionPadding}>
                <Grid item xs={8}>
                  <img src={article.fields.thumbnail} alt={article.id} className={classes.articleImage}/>
                </Grid>
              </Grid>

              <Grid container justify='center' className={classes.sectionPadding}>
                <Grid item xs={6}>
                    <Typography variant="body1">{article.fields.bodyText}</Typography>
                </Grid>
              </Grid>

            </div>
              )
        }

        return <div>Oops, we couldn't find that article </div>;
    }
}

// Provide access to state
const mapStateToProps = (state: MainState) => ({
    articlesState: state.articles,
    formState: state.form
});

// Provide access to dispatching actions
const mapDispatchToProps = (dispatch: Dispatch<ArticlesAction>) => ({
    ...bindActionCreators({articleFetch}, dispatch)
});

// Connect mappers with component
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ArticleDetails));
