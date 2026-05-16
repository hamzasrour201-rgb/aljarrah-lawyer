import { cn } from '@/lib/utils'

export default function GoldDivider({ className }: { className?: string }) {
  return <hr className={cn('divider-gold my-0', className)} />
}
