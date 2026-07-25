export function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-terracota/70 dark:bg-terracota/50 rounded-full blur-[90px] animate-aurora-a" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-musgo/70 dark:bg-musgo/50 rounded-full blur-[90px] animate-aurora-b" />
      <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-dorado/70 dark:bg-dorado/50 rounded-full blur-[90px] animate-aurora-c" />
    </div>
  )
}
