import '../styles/playinglist.scss';
import AddFavIcon from '../assets/icon/addfav.svg';

export default function PlayList () {

  return(
    <>
    <div className="play-list">
      <card className="card-container">
      <div className="card-title" >
        <div className="card-title-text">
          <h4 className="text"style={{fontWeight:'500',fontSize:'1.5rem'}}>正在播放</h4>
          </div>

        </div>
      <div className="card-img-name" >
        <div className="card-img" >
        <img className="img" src="https://picsum.photos/200" alt="pic" />
          </div>
        <div className="card-name">
          <div className="card-name-text">
            Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor...
            </div>
          
        </div>

      </div>

      <div className="card-author-add" >
      <div className="card-author" >Seinabo Sey</div>
      <div className="card-addfav">
        <img src={AddFavIcon} alt="AddFavorite" /></div>
      </div>
      <div className="card-info" style={{display:'flex',justifyContent:'space-arround'}}>
        <div className="card-date">2023-04-08</div>
        <div className='card-duration'>・1 小時 20 分</div>
      </div>
      <div className="card-description">
        <div className="card-description-text">
       A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. Youll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.         
        </div>
      </div>

      <div className="playlist">
        <div>我是撥放器</div>
      </div>

      </card>
      
      
    </div>
    </>
  );
}