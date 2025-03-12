import Link from 'next/link'
import { Button } from './ui/button'

const LinkButton = ({ href, text, classes }: { href: string, text: string, classes: string}) => {
    return (
        <Link href={href}>
            <Button className={classes}>{text}</Button>
        </Link>
    )
}

export default LinkButton