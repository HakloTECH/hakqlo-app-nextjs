
import Splash from '../components/Splash'
import WindowList from '../components/WindowList'
import DialogList from '../components/DialogList'
import '../js/i18n';

function App(props) {
  return (
    <div className='App'>
      <Splash />
      <WindowList />
      <DialogList />
    </div>
  )
}
export async function getStaticProps() {
  return {
    props: {
      test:true
    },
  };
}
export default App;