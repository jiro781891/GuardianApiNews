import React from 'react';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import { store, loadStore } from '../localStorage'
import throttle from 'lodash.throttle';
import { ArticleItem } from './ArticleItem'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = (theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(12)
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    display:'-webkit-box'
  },
  paper:{
    padding: theme.spacing(3, 2),
    margin: '10px',
    overflow: 'scroll'
  },
  favoritesTitle:{
    marginTop: -theme.spacing.unit
  }
}));


class PinnedArticlesList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pinnedArticles: loadStore()
    }
  }

  componentDidMount() {

    //store.subscribe listener so it is called every time the storage state changes,
    // it should not be called too often because it uses the expensive JSON.stringify operation
    // To solve this, we will use a library called lodash which includes a handy utility called throttle

    store.subscribe(throttle(() => {
      this.setState({
        pinnedArticles: loadStore()
      })
    }, 1000));


  }

  render(){

    const {classes} = this.props;
    const {props} = this;
    const {pinnedArticles} = this.state

    var viewed_articles_list = JSON.parse(window.localStorage.getItem('viewed_articles_list')) || [];
    var pinned_articles_list = JSON.parse(window.localStorage.getItem('pinned_articles_list')) || [];

    if (pinnedArticles){

      return (
        <div className={classes.root}>

          <Paper className={classes.paper}>
            <Typography variant="caption" display="block" align='left' gutterBottom className={classes.favoritesTitle}>
              Favorites
            </Typography>
          <GridList className={classes.gridList} cols={3.5} >

            {pinnedArticles.map(article => (
              <ArticleItem key={article.id} article={article} {...props}
                          viewed_articles_list={viewed_articles_list}
                          pinned_articles_list={pinned_articles_list}/>)
            )}

          </GridList>
          </Paper>
        </div>
      );
    }
    else{
      return(null)
    }
  }
}

export default (withStyles(styles)(PinnedArticlesList));
