import React from 'react'
import "../componentStyles/Footer.css"
import {Phone,Mail, GitHub, LinkedIn, YouTube, Instagram} from '@mui/icons-material'
function Footer() {
  return (
    <footer className='footer'>
        <div className="footer-container">
            {/* section 1 */}
            <div className="footer-section contact">
                <h3>Contact us</h3>
                <p><Phone fontSize='small'/> Phone: 1234567890</p>
            <p><Mail fontSize='small'/> Email:sk20820608@gmail.com</p>
            </div>
            {/*  Section 2*/}
            <div className="footer-section social">
                <h3>Follow Me</h3>
                <div className="social-links">
                    <a href="" target='_blank'><GitHub className='social-icon'/></a>
               <a href="" target='_blank'><LinkedIn className='social-icon'/></a>
               <a href="" target='_blank'><YouTube className='social-icon'/></a>
               <a href="" target='_blank'><Instagram className='social-icon'/></a>

                </div>
          

            </div>
          {/* section 3
             */}
             <div className="footer-section about">
                <h3>About</h3>
                <p>Ecommerce Website using MERN</p>
             </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; All rights reserved</p>
        </div>
    </footer>
    
  )
}

export default Footer