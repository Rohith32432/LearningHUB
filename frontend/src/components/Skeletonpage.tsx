import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonUser() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}

export function SkeletionPage() {
    return (
        <div className="min-h-dvh w-full bg-background flex gap-5 flex-col justify-center items-center">
                 <Skeleton className="h-[200px] w-[300px] rounded-xl" />
                 <div className="space-y-5">
                <Skeleton className="h-8 w-[350px]" />
                <Skeleton className="h-6 w-[350px]" />
            </div>
        </div>
    )

}

export function XSkeletonCard() {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

export function SkeletionCard() {
    return (
        <div className="h-max bg-background flex flex-col justify-center items-center">
                 <Skeleton className="h-[200px] w-[300px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-12 w-[150px]" />
                <Skeleton className="h-12 w-[100px]" />
            </div>
        </div>
    )
}
