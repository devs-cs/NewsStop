import './App.css';
import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import NewsCard  from './component/NewsCard';
import {CardProps}  from './component/NewsCard';
import {initializeApp} from "firebase/app"
import "firebase/database"
import { getDatabase, ref, onValue } from 'firebase/database';

export default function App() {
    const [data, setData] = useState<CardProps[]>([]);
    const mapping = {
      "cnn": "CNN", 
      "fox-news": "Fox News", 
      "nbc-news": "NBC News", 
      "bbc-news": "BBC News", 
      "npr": "NPR"
    } as { [key: string]: string };

    useEffect(() => {
      // Firebase's Configuration 
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        databaseURL: process.env.REACT_APP_databaseURL,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId
      }
          
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      
      // Access database sub-branch  
      const articles = ref(db,"/day0")

      // Store data from database
      onValue(articles, (snapshot) => {
          const retData = snapshot.val();
          let dataN:any = [];
          for (let key in retData){
              if(retData.hasOwnProperty(key)){
                  const retObj = JSON.parse(retData[key]);
                  var Obj = {
                    source: mapping[retObj["source"]], 
                    title: retObj["title"], 
                    author: retObj["author"], 
                    url: retObj["url"], 
                    summary: retObj["text"]};
                  dataN.push(Obj);
              }
          }
          setData(dataN)
        });  
  },[])
  
  return (
      <div>
        <h1> News </h1>
        <Row gutter={[16, 16]}>
          {data.map((news, index) => (
            <Col key={index} span={6}>
              <NewsCard 
              title={news.title}
              summary={news.summary}
              source={news.source}  />
            </Col>
          ))}
        </Row>
      </div>
    );

}