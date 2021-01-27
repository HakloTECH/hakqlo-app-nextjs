import Head from 'next/head'

import Splash from '../components/Splash'
import WindowList from '../components/WindowList'
import DialogList from '../components/DialogList'
import '../js/i18n';

function App(props) {
  return (
    <div>
      <Head>
        <title>Hakqlo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
      </Head>
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