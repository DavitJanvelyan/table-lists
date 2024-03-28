import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import "components/DarkMode/index.scss"

function DarkMode() {

  const selectedTheme = localStorage.selectedTheme;

  if (selectedTheme === 'dark') {
    setDarkMode();
  }

  function setDarkMode() {
    document.querySelector("body").setAttribute('data-theme', 'dark')
    localStorage.setItem('selectedTheme', 'dark')
  }

  function setLightMode() {
    document.querySelector("body").setAttribute('data-theme', 'light')
    localStorage.setItem('selectedTheme', 'light')
  }

  function toggleTheme({ target: { checked } }) {
    checked ? setDarkMode() : setLightMode();
  }

  return (
    <div className='dark_mode'>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        defaultChecked={selectedTheme === "dark"}
        onChange={toggleTheme}
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <LightModeIcon fontSize="medium" style={{color: 'yellow', paddingLeft: '3px'}} />
        <DarkModeIcon fontSize="medium" style={{color: 'white', paddingLeft: '40px'}} />
        {/*<Sun />*/}
        {/*<Moon />*/}
      </label>
    </div>
  )
}

export default DarkMode;