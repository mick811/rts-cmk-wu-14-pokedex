interface StatBarProps {
    label: string
    value: number
}

export default function StatBar({
    label,
    value,
}: StatBarProps) {
    const maxValue = 255
    const percentage = Math.min(100, (value / maxValue) * 100)

    return (
        <div className="flex items-center gap-3" aria-label={`${label} ${value}`}>
            <span className="w-28 shrink-0 capitalize text-zinc-600 dark:text-zinc-400">{label.replace('-', ' ')}</span>
            <div className="flex-1 h-2 rounded bg-zinc-300 dark:bg-zinc-800">
                <div 
                    className={`h-2 rounded bg-green-600 dark:bg-green-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="w-10 text-right tabular-nums text-zinc-900 dark:text-zinc-100">{value}</span>
        </div>
    )
}