import React from 'react';
import { Divider, Typography } from 'antd';

const { Title } = Typography;

interface TextWithLineProp {
  text: string;
}

const TextWithLine: React.FC<TextWithLineProp> = ({ text }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <hr style={{ flexGrow: 1, marginRight: 10 }}/>
        <Title style={{ fontFamily: 'serif', fontSize: '16px', color: "#0A1158" }}>
        {text}
         </Title>
        <hr style={{ flexGrow: 1, marginLeft: 10 }} />
   </div>
  );
};

export default TextWithLine;
