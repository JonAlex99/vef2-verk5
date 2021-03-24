import { useParams } from 'react-router-dom'
import { News } from '../components/news/News';


export function NewsPage() {
  let { id } = useParams();
  // TODO útfæra fréttasíðu
  return(
    <News id={id} />
  )
}