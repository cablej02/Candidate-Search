import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

// helper interface to define the context type
interface SavedCandidatesContextType {
    savedCandidates: {[id:number]: Candidate};
    setSavedCandidates: React.Dispatch<React.SetStateAction<{[id:number]: Candidate}>>;
}

// create context with a default value of undefined
export const SavedCandidatesContext = createContext<SavedCandidatesContextType | undefined>(undefined);

// use hook to ensure we don't return an undefined context
export const useSavedCandidates = () => {
    const context = useContext(SavedCandidatesContext);
    if (!context) {
        throw new Error('useSavedCandidates must be used within a SavedCandidatesProvider');
    }
    return context;
}

// component manages the state of saved candidates
export const SavedCandidatesProvider = ({children}: {children: React.ReactNode}) => {
    // get local storage data and parse it, if it exists, otherwise return an empty object
    const getLocalCandidates = () => {
        try{
            const savedCandidates = localStorage.getItem('savedCandidates');
            return savedCandidates ? JSON.parse(savedCandidates) : {};
        }catch(err){
            console.error(err);
            return {};
        }
    }

    const [savedCandidates, setSavedCandidates] = useState<{[id:number]: Candidate}>(getLocalCandidates());
    const isLoaded = useRef(false);

    useEffect(() => {
        // don't save candidates on initial load
        if(!isLoaded.current){
            isLoaded.current = true;
            return;
        }

        console.log('Saving Candidates:', savedCandidates);
        localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    },[savedCandidates]);

    return (
        <SavedCandidatesContext.Provider value={{savedCandidates, setSavedCandidates}}>
            {children}
        </SavedCandidatesContext.Provider>
    );
}