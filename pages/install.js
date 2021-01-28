
//import Install from '../components/Install'
import DialogList from '../components/DialogList'
export async function getStaticProps() {
  return {
    props: {
      
    },
  };
}
function Inst({}){
  return (
    <div>
      <DialogList />
    </div>
  )
}
export default Inst;
/*export default function(props){
  return Install
}*/