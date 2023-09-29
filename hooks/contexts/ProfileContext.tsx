"use client"
import { Dispatch, SetStateAction, createContext, useState } from "react";

type ProfileContextProviderProps = {
  children: React.ReactNode;
}

type profile = 0 | 1 | 2 | 3 | 4 | number | undefined;

type ProfileContextType = {
  profile: profile;
  setProfile: Dispatch<SetStateAction<profile>>;
}


export const ProfileContext = createContext<ProfileContextType>({ profile: undefined, setProfile: () => { } });

export const ProfileContextProvider = ({ children }: ProfileContextProviderProps) => {
  const [profile, setProfile] = useState<profile>()
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}