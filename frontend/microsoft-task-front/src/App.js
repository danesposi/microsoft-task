import Menu from './components/Menu'
import TaskDisplayer from './components/TaskDisplayer'
import { Provider } from 'react-redux';
import Sidebar from './components/Sidebar';
import store from './store/store';
import SortableExample from './components/SortableExample'

function App() {

  return (
    <Provider store={store}>
      <main className='relative flex flex-row bg-zinc-50 min-w-screen h-screen'>
        <section className='py-2 hidden md:inline-flex md:w-[19rem] xl:inline-flex xl:w-[19rem] flex-shrink-0'>
          <Menu/>
        </section>
        <section className='bg-blue-800/90 opacity-80 w-[100%] h-[100%] rounded-tl-lg'>
          <TaskDisplayer/>
        </section>
        <section>
          <Sidebar/>
        </section>
      </main>
    </Provider>
  );
}

export default App;
