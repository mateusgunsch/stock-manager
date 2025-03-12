import Link from 'next/link'
import { Button } from './ui/button'
import { ReactNode } from 'react'

const LinkButton = ({ href, text, classes, icon }: { href: string, text: string, classes: string, icon?: ReactNode}) => {
    return (
        <Link href={href}>
            <Button className={classes}>{icon} {text}</Button>
        </Link>
    )
}

export default LinkButton