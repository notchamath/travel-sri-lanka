import mainLogo from '../../../public/logo.jpeg';

import './Logo.styles.scss';

function Logo() {
  return (
    <div className='logo-container'>
      <img src={mainLogo} alt="Wander Sri Lanka Logo" />
    </div>
  )
}

export default Logo