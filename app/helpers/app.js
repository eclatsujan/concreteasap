import config from '../config';
//App Component
import AppBackground from '../components/AppBackground';
import AppLoading from '../components/AppLoading';

export function checkLoading(app_loading){
  if(app_loading){
    return (
        <AppBackground>
          <AppLoading/>
        </AppBackground>
    );
  }
}
