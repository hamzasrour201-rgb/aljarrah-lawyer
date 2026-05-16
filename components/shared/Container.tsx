import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  narrow?: boolean
}

export default function Container({ children, className, narrow }: Props) {
  return (
    <div className={cn('container-brand', narrow && 'max-w-5xl', className)}>
      {children}
    </div>
  )
}
