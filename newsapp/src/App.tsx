// Relevant imports 
import './App.css';
import Header from './component/header/Header'
import NewsCard, { CardProps } from './component/body/NewsCard';
import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from 'firebase/database';

export default function App() {
    // State for card's data 
    const [data, setData] = useState<CardProps[]>([]);
    // Map news source to abbreviated names 
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
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // ms * s * min * hr 
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
  
  // Create a list to store cards content 
  var origin: any = []
  for(let i = 0; i < 20; i++)
    origin.push(i)

  // Set the number of columns based on the screen size
  var columns: number = 4;
  if (window.innerWidth < 700)
    columns = 2;
  else if(window.innerWidth < 1400)
    columns = 3;

  return (
    <div>
        <Header /> 
        <div style = {{ columnCount: columns, columnGap: "10px"}}>
          {data.length !== 0 ? (data.map((news) => (
              // If there is data available
              <NewsCard 
              loading = {false}
              title={news.title}
              summary={news.summary}
              source={news.source}  
              url = {news.url}
              imageUrl = {news.imageUrl}/>
          ))) : 
          // If data is empty
          (origin.map(() => (
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