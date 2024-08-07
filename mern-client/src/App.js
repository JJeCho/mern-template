import {useAuth} from './contexts/AuthContext'
import Header from './components/Header'
import CustomCalendar from './components/Calendar'
import Pet from './components/Pet'

export default function App() {
  const {isLoggedIn} = useAuth()

  return (
    <div className='App'>
      <Header />
      <Pet>  </Pet>

      {isLoggedIn ? <LoggedInText /> : <LoggedOutText />}
    </div>
  )
}

const LoggedInText = () => {
  const {account} = useAuth()
  return <p>Hey, {account.username}! I'm happy to let you know: you are authenticated as a {account.role}!</p>
}

const LoggedOutText = () => (
  <p>Don't forget to start your backend server, then authenticate yourself.</p>
)