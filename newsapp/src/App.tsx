import './App.css';
import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import NewsCard  from './component/body/NewsCard';
import {CardProps}  from './component/body/NewsCard';
import {initializeApp} from "firebase/app"
import "firebase/database"
import { getDatabase, ref, onValue } from 'firebase/database';
import Header from './component/header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { WindowsFilled } from '@ant-design/icons';

export default function App() {
    const [data, setData] = useState<CardProps[]>([]);
    const mapping = {
      "cnn": "CNN", 
      "fox-news": "FOX", 
      "nbc-news": "NBC", 
      "bbc-news": "BBC", 
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
      var predefinedDate = new Date(2023, 5, 14)
      var currentDate = new Date()
      predefinedDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      const timeDiff = Math.abs(currentDate.getTime() - predefinedDate.getTime());
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      const dbLink = `day${daysDiff}`;

      const articles = ref(db,dbLink)

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
                    summary: retObj["text"],
                    imageUrl: retObj['imageUrl']}
                dataN.push(Obj);
                console.log(retObj)
              }
          }
          setData(dataN)
        });  
  },[])
  
  var origin: any = []
  for(let i = 0; i < 20; i++)
    origin.push(i)

var columns: number = 4;
if (window.innerWidth < 700)
    columns = 2;
else if(window.innerWidth < 1400)
  columns = 3;
console.log(window.innerWidth)
  return (
    <div >
        <Header /> 
        <div style = {{ columnCount: columns, columnGap: "10px"}}>
          {data.length !== 0 ? (data.map((news, index) => (
        
              <NewsCard 
              loading = {false}
              title={news.title}
              summary={news.summary}
              source={news.source}  
              url = {news.url}
              imageUrl = {news.imageUrl}/>
          ))) : 
          (origin.map((i: string) => (
              <NewsCard 
              loading = {false}
              title = {""}
              summary = {""}
              source = {""}  
              url = {""}
              imageUrl = {""}
              />
            
          )))}
        </div>
    </div>
    );

}

/*
        <h1> News </h1>
        <Row gutter={[16, 16]}>
          {data.length !== 0 ? (data.map((news, index) => (
            <Col key={index} span={6}>
              <NewsCard 
              loading = {false}
              title={news.title}
              summary={news.summary}
              source={news.source}  />
            </Col>
          ))) : 
          (origin.map((i: string) => (
            <Col key={i} span={6}>
              <NewsCard 
              loading = {false}
              title = {"title"}
              summary = {"summary"}
              source = {"source"}  />
            </Col>
          )))}
        </Row>
    */
