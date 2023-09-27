import { Card, Skeleton } from 'antd'

const CardArticleSkeleton = () => {
  return (
    <Card id='card-article-skeleton'>
      <Skeleton 
        active 
        paragraph={{ rows: 1 }} 
      />
    </Card>
  )
}

export default CardArticleSkeleton