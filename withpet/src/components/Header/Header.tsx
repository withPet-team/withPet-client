import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import SubmitDiary from 'components/Diary/SubmitDiary'
import logoHeader from 'assets/Logo/headerLogo.webp'
import logoSprite from 'assets/sprites_icon.png'

type HeaderProps = {
  title?: string
}

const Header: FC<HeaderProps> = ({ title = '' }) => {
  const headerContent = (
    <div
      className="w-8 h-8"
      style={{
        backgroundImage: `url(${logoSprite})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: title === 'MyPage' ? '0 -308px' : '-39px -308px',
      }}
    />
  )
  const navigate = useNavigate()

  const onClick = () => {
    navigate('/setting')
  }

  return (
    <header className="w-full max-w-scr h-14 px-2 absolute left-1/2 -translate-x-1/2 border-b border-black border-solid leading-12 bg-primary-100 flex flex-row justify-between">
      <img src={logoHeader} alt="logo" className="w-18 h-13" />
      <p className="font-bold absolute left-1/2 -translate-x-1/2">{title}</p>
      {title === 'Diary' ? (
        <SubmitDiary />
      ) : title === 'MyPage' ? (
        <button type="button" onClick={onClick} aria-label="설정 버튼">
          {headerContent}
        </button>
      ) : (
        <button type="button" aria-label="알림 버튼">
          {headerContent}
        </button>
      )}
    </header>
  )
}

export default Header
