import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const JobDetailSkeleton = () => (
  <div className='container max-w-4xl mx-auto px-4 py-8'>
    <Skeleton className='h-8 w-40 mb-4' />
    <Card>
      <CardContent className='p-6 space-y-4'>
        <Skeleton className='h-6 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />
      </CardContent>
    </Card>
  </div>
)

export default JobDetailSkeleton
