export function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-terracota/40 dark:bg-terracota/25 rounded-full blur-[100px] animate-aurora-a" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-musgo/40 dark:bg-musgo/25 rounded-full blur-[100px] animate-aurora-b" />
      <div className="absolute bottom-0 left-1/4 w-[26rem] h-[26rem] bg-dorado/40 dark:bg-dorado/25 rounded-full blur-[100px] animate-aurora-c" />
    </div>
  )
}
