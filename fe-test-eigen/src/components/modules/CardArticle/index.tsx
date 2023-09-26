import { Card } from 'antd'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import ICardArticle from './interface'

const CardArticle = ({ article }: ICardArticle) => {
  return (
    <NavLink to={article.url} target="_blank">
      <Card hoverable={true} >
        <Card.Meta
          title={article?.title}
          description={`${article?.author || "Unknown"} | ${moment(article?.publishedAt).format("DD MMM YYYY HH:mm")} | ${article?.source?.name || "Unknown Source"}`}
        />
      </Card>
    </NavLink>
  )
}

export default CardArticle