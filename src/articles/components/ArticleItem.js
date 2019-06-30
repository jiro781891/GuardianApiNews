import * as React from 'react';
import { Article } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {saveStore} from '../localStorage';
import StarIcon from '@material-ui/icons/Star';
import FiberNewIcon from '@material-ui/icons/FiberNew'
// import './PostItem.css';

interface Props {
    Article: Article;
}

const useStyles = makeStyles(theme => ({
  starIcon:{
    color: '#f44336'
  },
  articleTitle:{
    cursor: 'pointer'
  },
  infoIcon:{
    position:'absolute',
    left: theme.spacing.unit,
    top: theme.spacing(0.5),
    color: 'red'
  },
  listElement:{
    minWidth: '400px',
    maxWidth: '400px',
  },
}));

export const ArticleItem: React.SFC<Props> = props => {

    const classes = useStyles();
    let title: string | JSX.Element = props.article.webTitle;

    // Force update for functional component
    // Since react 16.8 released with hooks, function components are now have the ability to hold persistent state. With that ability you can now mimic a forceUpdate:
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function handleOpenArticle(id) {
      if ( !existsInViews ){
        props.viewed_articles_list.push(id);
        window.localStorage.setItem('viewed_articles_list', JSON.stringify(props.viewed_articles_list));
        props.history.push('/' + id.replace(/\//g, '%2F'));
      }
    }


    function addToFavorites(article){
      if (!existsInPins){
        props.pinned_articles_list.push(props.article);
        saveStore(props.pinned_articles_list)
        forceUpdate()
      }
    }

    var existsInPins = false;

    for(var i = 0; i < props.pinned_articles_list.length; i++) {
      if (props.pinned_articles_list[i].id === props.article.id) {
        existsInPins = true;
        break;
      }}


    var existsInViews = props.viewed_articles_list.includes(props.article.id)

    return (

      <GridListTile style={props.style} key={title} className={classes.listElement}>
        <img src={props.article.fields && props.article.fields.thumbnail} alt={props.article.id}/>
        { existsInViews ? <VisibilityIcon className={classes.infoIcon}/> : null }
        { props.newPost ? <FiberNewIcon className={classes.infoIcon} /> : null}
        <GridListTileBar
          title={<span className={classes.articleTitle}>{title}</span>}
          onClick={ () => handleOpenArticle(props.article.id)}
          titlePosition="bottom"
          actionIcon={
            <IconButton aria-label={`star ${title}`} className={classes.starIcon} onClick={ (e) => (addToFavorites(props.article), e.stopPropagation())}>
            { existsInPins ? <StarIcon /> : <StarBorderIcon /> }
            </IconButton>
          }
          actionPosition="left"
        />
      </GridListTile>

    );
};
