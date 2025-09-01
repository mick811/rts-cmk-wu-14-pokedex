export default function Badge({
    children,
}: {
    children: React.ReactNode
}) {
    return <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-xs rounded-full capitalize text-zinc-700 dark:text-zinc-300">
        {children}
    </span>
}