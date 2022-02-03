import Menu from './components/Menu'
import TaskDisplayer from './components/TaskDisplayer'
import Sidebar from './components/Sidebar';
import { useSelector } from 'react-redux';

function App() {

  const toggle = useSelector(store => store.toggle)
  const toggleMenu = useSelector(store => store.toggleMenu)

  return (
      <main className='relative grid grid-cols-1 lg:grid-cols-10 bg-zinc-50'>
        <section className={`${toggleMenu ? 'absolute bg-zinc-50 h-screen w-full' : 'hidden'} lg:relative lg:inline-flex lg:col-span-2 z-10`}>
          <Menu/>
        </section>
        <section className={`col-span-1 ${toggle ? 'lg:col-span-6' : 'lg:col-span-8'}`}>
          <TaskDisplayer/>
        </section>
        <section className={`${toggle ? 'col-span-2' : 'hidden'}`}>
          <Sidebar/>
        </section>
      </main>
  );
}

export default App;
