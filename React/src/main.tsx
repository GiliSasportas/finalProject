import React from 'react'
import ReactDOMClient, { createRoot } from 'react-dom/client';
import App from './App.tsx'
import './index.css'
import { Login } from "./Component/Login"
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { WriteTask } from './Component/writeTask/WriteTask.tsx';
import { Alphon } from './Component/Alphon/Alphon.tsx'
import { Checkout } from './Component/SignUp/Checkout.tsx';
import { Task } from './Component/writeTask/Task.tsx'
import { Main } from './Component/Menu/Menu.tsx';
import { ViewTask } from './Component/ViewTask.tsx';
import { ShowMessage } from './Component/showMassage/ShowMessage.tsx';
import { WriteMessage } from './Component/WriteMessage.tsx';
import { UploadDoc } from './Component/writeTask/UploadDoc.tsx';
import { ViewSpecificTask } from './Component/ViewSpecificTask.tsx';
import { StatusStudent } from './Component/StatusStudent.tsx';
import { BackgroundHome } from './Component/BackgroundHome/BackgroundHome.tsx';
import { taskStatusTeachet } from './Component/taskStatusTeachet.tsx';
import { Galery } from './Component/galery/Galery.tsx';
import { Forum } from './Component/forum/forum.tsx';
import { ForumTeacher } from './Component/ForumTeacher.tsx';
import { CreatPassword } from './Component/CreatPassword.tsx';
import { UploadFileDetails } from './Component/signUpExcel/UploadFileDetails.tsx';
import { alphonStudent } from './Component/alphonStudent.tsx';
import { Chat } from './Component/Chat.tsx';
const router = createBrowserRouter([

  {
    path: '/',
    Component: App,
  },
  {
    path: 'CreatePass',
    Component: CreatPassword,
  },
  {
    path: 'SignUp',
    Component: Checkout
  },

  {
    path: 'Login',
    Component: Login,

    children: [{

      path: 'SignUp',
      Component: Checkout

    }]
  },
  {
    path: 'main',
    Component: Main,

    children: [

      {
        path: 'alphon',
        Component: Alphon
      }, {
        path: 'BackgroundHome',
        Component: BackgroundHome
      },
      {
        path: 'alphonStudent',
        Component: alphonStudent
      }
      ,
      {
        path: 'ViewTask',
        Component: ViewTask
      }

      , {
        path: 'UploadDoc',
        Component: UploadDoc
      }
      , {
        path: 'WriteTask',
        Component: WriteTask
      }

      , {
        path: 'ShowMessage',
        Component: ShowMessage
      }

      , {
        path: 'WriteMessage',
        Component: WriteMessage
      }
      , {
        path: 'StatusStudent',
        Component: StatusStudent
      }
      , {
        path: 'ViewSpecificTask',
        Component: ViewSpecificTask
      }
      , {
        path: 'taskStatusTeachet',
        Component: taskStatusTeachet
      }
      , {
        path: 'Galery',
        Component: Galery
      }
      , {
        path: 'Forum',
        Component: Forum
      }
      ,
      {
        path: 'TeacherForum',
        Component: ForumTeacher
      }
      ,
      {
        path: 'sinUp',
        Component: UploadFileDetails
      }
      ,
     
      // {
      //   path: 'Chat',
      //   Component: Chat
      // },
      {
        path: 'tasks',
        Component: Task,
        children: [{
          path: 'WriteTask',
          Component: WriteTask
        },
        {
          path: 'uploadDoc',
          Component: UploadDoc
        },


        ]
      }


    ]
  }
]);

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
