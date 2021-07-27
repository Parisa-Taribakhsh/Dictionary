import '../styles/App.css';
import {Switch,Route} from "react-router-dom";
import MyDictionary from "./MyDictionary";
import Logins from "./Logins";
import NotFound from "./NotFound";


function App() {
  return (
   <>
       <Switch>
           <Route path ='/my-dictionary' exact component={MyDictionary}/>
           <Route path ='/' exact component={MyDictionary}/>
           <Route path='/login' exact component={Logins}/>
           <Route path ='' exact component={NotFound}/>
       </Switch>
       </>
  );
}

export default App;
