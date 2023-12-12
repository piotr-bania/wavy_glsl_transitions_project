'use client'

import './navbar.scss'
import { motion as m } from 'framer-motion'
import { logo_variant } from '../animations/Framer_Motion_Variants'

const Navbar = () => {
    return (
        <section>
            <m.div
                className='logo'
                initial='hidden'
                animate='visible'
                variants={logo_variant}
            >
                <p>Bespoke</p>
                <p className='accent'>Programming</p>
            </m.div>
        </section>
    )
}

export default Navbar