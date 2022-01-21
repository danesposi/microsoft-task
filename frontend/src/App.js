import './App.css';
import Menu from './components/Menu'
import TaskDisplayer from './components/TaskDisplayer'
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className='flex flex-row bg-zinc-50 w-screen h-screen'>
        {/* Menu */}
        <section className='py-2 hidden md:inline-flex md:w-[19rem] xl:inline-flex xl:w-[19rem] flex-shrink-0'>
          <Menu/>
        </section>

        {/* Task Displayer */}
        <section className='bg-indigo-600/90 opacity-80 w-[100%] h-[100%] rounded-tl-lg'>
          <TaskDisplayer/>
        </section>
      </div>
    </Provider>
  );
}

export default App;
