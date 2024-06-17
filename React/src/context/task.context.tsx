import React from 'react';
import { useEffect, useState,createContext } from 'react';

const taskContext = React.createContext('');

export const taskDetails = (props:any) => {
    const [task, setTask] = useState('');



  // כל הקומפוננטות שתירשנה מה provider
  // תהיה להן גישה ישירה ל value
  return <taskContext.Provider value={task}>
    {/* מאפיין מוגדר מראש בריאקט שמכיל את התוכן הפנימי שנכתב בתוך הקומפוננטה */}
      {props.children}
  </taskContext.Provider>
}


export default taskContext;