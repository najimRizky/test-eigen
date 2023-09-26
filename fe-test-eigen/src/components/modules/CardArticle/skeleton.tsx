import { Card, Skeleton } from 'antd'

const CardArticleSkeleton = () => {
  return (
    <Card>
      <Skeleton 
        active 
        paragraph={{ rows: 1 }} 
      />
    </Card>
  )
}

export default CardArticleSkeleton