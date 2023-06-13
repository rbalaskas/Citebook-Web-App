import React,{useState} from 'react'
import { connect,useDispatch } from 'react-redux'
import Left_sidebar from './Left_sidebar'
import { Grid } from 'semantic-ui-react'

import history from '../history'
import { useEffect } from 'react'
import Upload_comp from './Upload_comp'
import Post_List from './Post_List'
import { feed_post,my_post,click_left_sidebar } from '../actions'
import Right_sidebar from './Right_sidebar'
import Edit_info from './Edit_info'
import Followers_list from './Followers_list'
import Request_data from './Import_GS'


export const Logged_HomePage = (props) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState();
  const[followers,setFollowers]=useState();
  let response=0;
 
  const fetchdata= async () =>{
   
    if(window.location.href=="http://localhost:3000/citebook/papers"
    || props.info.clicked_value=="papers"){
      console.log("my posts");
      response=(await dispatch(my_post(props.userId)));
    }
    else{
      
      response=(await dispatch(feed_post(props.userId)));
      
    }
  console.log(response);
  }
  const update_values= async(follow,info)=>{
    setFollowers(follow);
    setInfo(info);
    return;
  }
  useEffect(()=>{
   
    if(!props.isSignedIn){
      history.push("/");
    }
    else{
    if((props.info.clicked_value=="papers" ||props.info.clicked_value=="citebook") ){
      update_values(false,false);
      console.log("POSTSSSSS");
     // setInfo(false);
       //   setFollowers(false);

        console.log("generate list of posts");
        console.log(props.userId);
        fetchdata().catch(console.error);
      }
     
    }
  },[props.info.clicked_value,props.info.user_list]);

  return (
    
    <Grid columns={3} divided style={{"marginRight":"0px"}}>
      <Grid.Row >
        <Grid.Column width={3}  style={{"marginTop":"30px","paddingRight":"0px"}}>
          <Left_sidebar style={{"width":"100%"}} />
        </Grid.Column>
      {(props.info.clicked_value=="papers" ||props.info.clicked_value=="citebook") &&
      <Grid.Column width={10} > 
        <Upload_comp/> 
        <div style={{"marginTop":"40px"}}>
        <Post_List /> </div>
      </Grid.Column>
      }   
      {props.info.clicked_value=="info" &&
      <Grid.Column width={10} > 
        <Edit_info/>
      </Grid.Column>
      }   
      {props.info.clicked_value=="followers" &&
       <Grid.Column width={10} > 
        <Followers_list/>
      </Grid.Column>
      }
      <Grid.Column width={3} style={{"padding":"0px"}}> 
        <Right_sidebar/>
      </Grid.Column>
      </Grid.Row>
    </Grid>
    
   
  )
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    info: state.info
  };
};



export default connect(mapStateToProps, {})(Logged_HomePage)