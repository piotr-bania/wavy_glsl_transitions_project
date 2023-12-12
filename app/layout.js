import './globals.scss'
import Navbar from './components/navbar/Navbar'

export const metadata = {
    title: 'SilentCoder Stories - Immersive Coding Tales',
    description: 'Dive into the world of SilentCoder Stories, where each line of code unfolds into an engaging narrative.',
    author: 'SilentCoder Stories',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
