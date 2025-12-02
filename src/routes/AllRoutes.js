import { Routes, Route } from "react-router-dom";
import { CatsList, DogsList, ExploreList, HomePage, OthersList, Register, SearchList } from "../pages";
import PetDetail from "../pages/PetDetail";
import { PetPage } from "../pages/Cart/PetPage";
import { Login } from "../pages";
import { useAuth } from "../Context/AuthContext";
import { AdminDashboard } from "../AdminDashboard";
import { UserDashboard } from "../UserDashboard";
import { Privateroute } from "./Privateroute";
import { Questions } from "../Questions";
import { Loginasadmin } from "../Loginasadmin";
import { Ai } from "../Ai";
import { Aisearch } from "../Aisearch";
import { Adoption } from "../Adoption";
import { Covid } from "../Covid";
import { Checklist } from "../Checklist";
import {Articles} from  "../Articles"

export const AllRoutes = () => {
  const { user } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Explore" element={<ExploreList />} />
        <Route path="/Doggs/puppies" element={<DogsList />} />
        <Route path="/Cats/Kittens" element={<CatsList />} />
        <Route path="/Others" element={<OthersList />} />
        <Route path="/SearchList" element={<SearchList />} />
        <Route path="/Explore/:id" element={<PetDetail />} />
        <Route path="/Doggs/puppies/:id" element={<PetDetail />} />
        <Route path="/Cats/Kittens/:id" element={<PetDetail />} />
        <Route path="/Others/:id" element={<PetDetail />} />
        <Route path="/SearchList/:id" element={<PetDetail />} />
        <Route path="/Cart" element={<PetPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Cart/:id" element={<PetDetail />} />
        <Route path="/Ai" element={<Ai />} />
        <Route path="/Aisearch" element={<Aisearch />} />
        <Route path="/adoption-confirmation" element={<Adoption />} />
        <Route path="/Covid" element={< Covid />} />
        <Route path="/Checklist" element={< Checklist />} />
        <Route path="/Articles" element={<Articles />} />


        <Route
          path="/Dashboard"
          element={
            <Privateroute>
              {user?.isAdmin ? <AdminDashboard /> : <UserDashboard />}
            </Privateroute>
          }
        />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/Loginasadmin" element={<Loginasadmin />} />


      </Routes >
    </>
  )
}
