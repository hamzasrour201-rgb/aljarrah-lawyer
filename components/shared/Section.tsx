import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  id?: string
  as?: 'section' | 'div' | 'article'
}

export default function Section({ children, className, id, as: Tag = 'section' }: Props) {
  return (
    <Tag id={id} className={cn('section-padding', className)}>
      {children}
    </Tag>
  )
}
