'use client'
import { createContext, useContext, useReducer} from "react";



export const ACTION_TYPES={
    SET_LANG_LONG:'SET_LAT_LONG',
    SET_COFFEE_STORES:"SET_COFFE_STORES"
}
const storeReducer=(state:State,action:any)=>{
    switch(action.type){
        case ACTION_TYPES.SET_LANG_LONG:
            return {...state,latLong:action.payload.latLong}

        case ACTION_TYPES.SET_COFFEE_STORES:
            return {...state,coffeeStores:action.payload.coffeeStores}

        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }

}
interface State {
    latLong: string;
    coffeeStores: any[];
  }
  
  const initialState: State = { latLong: "", coffeeStores: [] };
  
  interface AppContextProps {
    state: State;
    dispatch: React.Dispatch<any>;
  }
  
  const AppContext = createContext<AppContextProps | undefined>(undefined);
  
  export function AppWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    const [state, dispatch] = useReducer(storeReducer, initialState);
  
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider>
    );
  }
  
  export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('useAppContext must be used within an AppWrapper');
    }
    return context;
  }




