import React, {useState, useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from axios;
// https://www.youtube.com/watch?v=1EMz54RsNI4
// install axios
const Pricing = () => {
    const [articleType, setArticleType] = useState("");
    const [articleAvailable, setArticleAvailable] = useState("");
    const [articleImage, setArticleImage] = useState("");
    const [timesUsed, setTimesUsed] = useState("");
    const [color, setColor] = useState("");
    const [articleRFID, setArticleRFID] = useState("");
    var url = 'localhost:3000';
    var id_ = '1a2b' ;
    var wardrobeid_ = '1a2b' ;
    //localhost 
    const profileData = async () => {
        try {
            const res = await axios.get(url + '/getSpecificWardrobe',{
                id_: id_,
                wardrobeid_: wardrobeid_     
            })
            console.log(res);
            var numberOfArticles = res.data.results[0].totalNumberOfArticles;
            /*
            setArticleType(res.data.results[0].articleData[i].type);
            setArticleAvailable(res.data.results[0].articleData[i].active);
            setArticleImage(res.data.results[0].picture.articleData[i].picture);
            setTimesUsed(res.data.results[0].articleData[i].timesUsed);
            setColor(res.data.results[0].articleData[i].color);
            setArticleRFID(res.data.results[0].picture.articleData[i].RFID);*/
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        profileData();
    }, [])
return (
    <div>
      <button onClick={() => profileData()}>New Person</button>
      <div className="card">
        <img src={profileImage} style={{ width: "100%" }} />
        <h1>{profileName}</h1>
        <p className="title">{profileEmail}</p>
        <p>{profileCell}</p>
        <p>
          <button>Contact</button>
        </p>
      </div>
    </div>
  );
};

export default CardItem
